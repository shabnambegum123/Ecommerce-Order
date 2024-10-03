function generateCouponCode(length = 10) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'; // You can add lowercase letters if needed
    let couponCode = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      couponCode += characters[randomIndex];
    }
  
    return couponCode;
  }
  


  function generateRandomDiscount(min = 5, max = 50) {
    
    if (min < 0 || max <= min) {
      throw new Error('Invalid discount range');
    }
    
   
    const discount = Math.floor(Math.random() * (max - min + 1)) + min;
    return discount;
  }
  
 module.exports = {generateCouponCode,generateRandomDiscount}