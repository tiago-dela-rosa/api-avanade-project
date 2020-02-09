module.exports = {
    getPrice : function (num) {
        return (num/100).toFixed(2);
    },
    setPrice : function (num) {
        return num*100;
    }
}     