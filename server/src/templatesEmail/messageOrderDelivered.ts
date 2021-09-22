
export const messageOrderDelivered = (user_name:string, order:number) => {
  return `
  <h1>Hi ${user_name}</h1>
  <h4> your order ${order} has been delivered </h4>
  <h4>You can leave a review of each product by entering the detail of each one.</h4>
  `
}
