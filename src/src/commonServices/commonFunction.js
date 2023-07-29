const commonFunction = {
  validateOnlyInteger: function (evt) {
    var charCode = evt.which ? evt.which : evt.keyCode;
    if (charCode >= 48 && charCode <= 57) {
      return true;
    } else {
      evt.preventDefault();
      return false;
    }
  },
  validateLetterAndSpace: function (evt) {
    var charCode = evt.which ? evt.which : evt.keyCode;
    if (charCode==32 ||
      (charCode >= 97 && charCode <= 122) ||
      (charCode >= 67 && charCode <= 90)
    ) {
      return true;
    } else {
      evt.preventDefault();
      return false;
    }
  },
};

export default commonFunction;
