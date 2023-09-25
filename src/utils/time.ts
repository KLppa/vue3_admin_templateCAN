export default function dateHandle(dateHours: number): string {
  let msg = ''
  if (dateHours <= 9) {
    msg = '早上好'
  } else if (dateHours <= 12) {
    msg = '上午好'
  } else if (dateHours <= 18) {
    msg = '下午好'
  } else {
    msg = '晚上好'
  }
  return msg
}
