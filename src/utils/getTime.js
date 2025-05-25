export const getTime = (date_time) => {
  const date = new Date(date_time);
  
  const hours = String(date.getHours()).padStart(2, '0');  // Lấy giờ và đảm bảo có 2 chữ số
  const minutes = String(date.getMinutes()).padStart(2, '0');  // Lấy phút
  const seconds = String(date.getSeconds()).padStart(2, '0');  // Lấy giây
  
  return `${hours}:${minutes}:${seconds}`;
};
