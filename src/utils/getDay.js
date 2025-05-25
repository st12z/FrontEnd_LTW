export const getDay = (date_time) => {
  const date = new Date(date_time);
  
  const day = String(date.getDate()).padStart(2, '0');  // Lấy ngày và đảm bảo có 2 chữ số
  const month = String(date.getMonth() + 1).padStart(2, '0');  // Lấy tháng (nhớ cộng 1 vì tháng bắt đầu từ 0)
  const year = date.getFullYear();  // Lấy năm
  
  return `${day}-${month}-${year}`;
};
