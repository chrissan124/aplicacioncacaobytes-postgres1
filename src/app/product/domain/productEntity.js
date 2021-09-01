import betweenValidator from "../../common/domain/betweenValidator";

export default function productEntity({
  name,
  productId,
  creationDate = new Date()
}){
  betweenValidator.stringBetween(name,2,100,'product')
  return Object.freeze({
    name,
    productId,
    creationDate
  })
}