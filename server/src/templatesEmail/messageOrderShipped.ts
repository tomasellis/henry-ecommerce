
export const messageOrderShipped = (user_name:string, order:number) => {
  return `
  <h1>Hi ${user_name}</h1>
  <h4> your order ${order} has been shipped </h4>
  `
}
