export class URMath {
    // From polyscope
    private static RAD_PER_DEGREE: number = 0.017453292519943295;
    private static DEGREES_PER_RAD: number = 57.29577951308232;
    //

    public static getDegrees(angleInRadians) {
        return URMath.DEGREES_PER_RAD * angleInRadians;
    }

    public static getRadians(angleInDegrees) {
        return URMath.RAD_PER_DEGREE * angleInDegrees;
    }


    public static Round(num, dp): number {
        if (arguments.length != 2) throw new Error("2 arguments required");
        num = String(num);
        if (num.indexOf('e+') != -1) {
            num = num.split("e+")[0];
        }
        if (num.indexOf('.') == -1) {
            return num;
        }
        var parts = num.split('.'),
            beforePoint = parts[0],
            afterPoint = parts[1],
            shouldRoundUp = afterPoint[dp] >= 5,
            finalNumber;

        afterPoint = afterPoint.slice(0, dp);
        if (!shouldRoundUp) {
            finalNumber = beforePoint + '.' + afterPoint;
        } else if (/^9+$/.test(afterPoint)) {
            finalNumber = Number(beforePoint) + 1;
        } else {
            var i = dp - 1;
            while (true) {
                if (afterPoint[i] == '9') {
                    afterPoint = afterPoint.substr(0, i) +
                        '0' +
                        afterPoint.substr(i + 1);
                    i--;
                } else {
                    afterPoint = afterPoint.substr(0, i) +
                        (Number(afterPoint[i]) + 1) +
                        afterPoint.substr(i + 1);
                    break;
                }
            }
            finalNumber = beforePoint + '.' + afterPoint;
        }
        return +`${finalNumber}`.replace(/0+$/, '');
    }
}