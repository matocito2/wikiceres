var SimpleMathExpressionChecker = (function () {
    function SimpleMathExpressionChecker(options) {
        if (options === void 0) { options = {}; }
        var _this = this;
        this.options = {};
        this.defaultOptions = {
            numbers: ["zero", "um", "dois", "três", "quatro", "cinco", "seis", "sete", "oito", "nove", "dez", "onze", "doze", "treze", "quatorze", "quinze", "dezesseis", "dezesete", "dezoito", "dezenove", "vinte"],
            operators: ['+', '-'],
        };
        this.expression = '';
        this.generate = function () {
            _this.expression = _this.getRandomInt(0, 20) + " "
                + _this.options.operators[_this.getRandomInt(0, 1)] + " "
                + _this.getRandomInt(1, 10) + " "
                + _this.options.operators[_this.getRandomInt(0, 1)] + " "
                + _this.options.numbers[_this.getRandomInt(0, _this.options.numbers.length - 1)]
                + " = ?";
            return _this.expression;
        };
        this.getRandomInt = function (min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; };
        this.setOptions(options);
    }
    SimpleMathExpressionChecker.prototype.check = function (result) {
        return this.checkExpression(this.expression, result);
    };
    SimpleMathExpressionChecker.prototype.checkExpression = function (exp, result) {
        if (!SimpleMathExpressionChecker.isValidExpression(exp))
            throw "Invalid expression : " + exp;
        var v = exp.match(/[a-z]+/g)[0];
        var extenso = this.options.numbers.lastIndexOf(v);
        var exp_remove_extenso = RegExp(/^([0-9]+)[ ]([+|\-])[ ]([0-9]+)[ ]([+|\-])/);
        var resultado = eval(exp.match(exp_remove_extenso)[0] + extenso);
        return resultado == result;
    };
    SimpleMathExpressionChecker.prototype.setOptions = function (options) {
        this.options = $.extend({}, this.defaultOptions, options);
    };
    return SimpleMathExpressionChecker;
}());
SimpleMathExpressionChecker.isValidExpression = function (exp) {
    var regex = RegExp(/^([0-9]+[ ][+|-][ ])+(\w+)[ ][=][ ]\?$/);
    return regex.test(exp);
};
(function ($) {
    $.fn.checkerMathExpression = function (options) {
        var $this = $(this);
        if ($this.data('math-exp-id') == null) {
            throw "data-expression-id not found in field element";
        }
        var smec = new SimpleMathExpressionChecker(options);
        var $expressao = $("#" + $this.data('math-exp-id'));
        $expressao.html(smec.generate());
        var defaultOptions = {
            msgInvalidResult: 'Resultado inválido.'
        };
        options = $.extend({}, defaultOptions, options);
        $.validator.addMethod("mathExpChecker", function (value, element) {
            if ($(element).data('math-exp-id') == null) {
                throw "data-expression-id not found in field element";
            }
            var expressao = $("#" + $(element).data('math-exp-id')).html();
            var check = smec.checkExpression(expressao, value);
            return this.optional(element) || check;
        }, $.validator.messages.mathExpChecker);
        $.validator.addClassRules("check-math-exp", {
            required: true,
            mathExpChecker: true
        });
        $.extend($.validator.messages, {
            mathExpChecker: options.msgInvalidResult
        });
        return this;
    };
}(jQuery));