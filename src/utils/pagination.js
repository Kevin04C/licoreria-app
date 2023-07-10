export const pagination = ({
  page = 0,
  take = 20
}) => {
  const currentPage = page > 0 ? Number(page) - 1 : 0
  const skip = currentPage * take

  return {
    take,
    skip
  }
}
