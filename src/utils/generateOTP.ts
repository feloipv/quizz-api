import User from "../model/user";

export const generateOTP = async (): Promise<string> => {
  let otp: string;
  let isDuplicate = true;
  let attempts = 0;
  const maxAttempts = 5; // Tránh vòng lặp vô hạn

  do {
    otp = Math.floor(100000 + Math.random() * 900000).toString(); // Tạo OTP 6 số
    const existingUser = await User.findOne({ otp }); // Kiểm tra xem OTP có tồn tại trong DB không

    if (!existingUser) {
      isDuplicate = false; // Nếu không trùng, thoát vòng lặp
    } else {
      attempts++;
    }

    if (attempts >= maxAttempts) {
      throw new Error("Không thể tạo OTP, vui lòng thử lại sau");
    }
  } while (isDuplicate);

  return otp;
};
