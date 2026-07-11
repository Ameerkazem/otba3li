import type {
  FabricObject,
} from "fabric";

import type {
  DesignPlacement,
} from "./placements";

/*
  حجم Fabric Canvas الحالي.

  عندنا Canvas مربع:
  500 × 500
*/
export const CANVAS_SIZE = 500;

/*
  تحول القيمة من نسبة مئوية إلى Pixels.

  مثال:

  value = "50%"
  total = 500

  النتيجة:
  250px
*/
export function percentToPixels(
  value: string,
  total: number = CANVAS_SIZE
) {
  const percentage =
    Number.parseFloat(
      value.replace("%", "")
    );

  return (
    percentage / 100
  ) * total;
}

/*
  تحول معلومات placement إلى حدود واضحة.

  placement مثلًا:

  {
    top: "48%",
    left: "50%",
    width: "24%",
    height: "28%"
  }

  والدالة تحولها إلى:

  centerX
  centerY
  width
  height
  left
  right
  top
  bottom
*/
export function getPlacementBounds(
  placement: DesignPlacement
) {
  const centerX =
    percentToPixels(
      placement.left
    );

  const centerY =
    percentToPixels(
      placement.top
    );

  const width =
    percentToPixels(
      placement.width
    );

  const height =
    percentToPixels(
      placement.height
    );

  return {
    centerX,
    centerY,

    width,
    height,

    left:
      centerX -
      width / 2,

    right:
      centerX +
      width / 2,

    top:
      centerY -
      height / 2,

    bottom:
      centerY +
      height / 2,
  };
}

/*
  تمنع عنصر Fabric من الخروج
  خارج منطقة الطباعة أثناء السحب.

  object:
  هو التصميم الذي يحركه المستخدم.

  placement:
  هو مكان الطباعة الخاص بالمنتج.
*/
export function lockObjectInsidePrintArea(
  object: FabricObject,
  placement: DesignPlacement
) {
  /*
    نحصل على حدود منطقة الطباعة.
  */
  const printArea =
    getPlacementBounds(
      placement
    );

  /*
    نحصل على حدود التصميم الحقيقية.

    getBoundingRect يحسب:

    - مكان التصميم.
    - حجمه.
    - التكبير والتصغير.
    - الدوران.
  */
  const objectBounds =
    object.getBoundingRect();

  /*
    مقدار الحركة المطلوبة
    لإرجاع التصميم إلى الداخل.
  */
  let moveX = 0;
  let moveY = 0;

  /*
    الحد الأيمن للتصميم.
  */
  const objectRight =
    objectBounds.left +
    objectBounds.width;

  /*
    الحد السفلي للتصميم.
  */
  const objectBottom =
    objectBounds.top +
    objectBounds.height;

  /*
    فحص الجهة اليسرى.

    إذا خرج التصميم من اليسار،
    نحسب المسافة التي نحتاجها
    حتى نرجعه إلى الداخل.
  */
  if (
    objectBounds.left <
    printArea.left
  ) {
    moveX +=
      printArea.left -
      objectBounds.left;
  }

  /*
    فحص الجهة اليمنى.
  */
  if (
    objectRight >
    printArea.right
  ) {
    moveX -=
      objectRight -
      printArea.right;
  }

  /*
    فحص الجهة العليا.
  */
  if (
    objectBounds.top <
    printArea.top
  ) {
    moveY +=
      printArea.top -
      objectBounds.top;
  }

  /*
    فحص الجهة السفلى.
  */
  if (
    objectBottom >
    printArea.bottom
  ) {
    moveY -=
      objectBottom -
      printArea.bottom;
  }

  /*
    نطبق الحركة الجديدة على التصميم.

    object.left:
    موقع التصميم الحالي أفقيًا.

    object.top:
    موقع التصميم الحالي عموديًا.
  */
  object.set({
    left:
      (object.left ?? 0) +
      moveX,

    top:
      (object.top ?? 0) +
      moveY,
  });

  /*
    نخبر Fabric أن إحداثيات
    العنصر تغيرت.
  */
  object.setCoords();
}