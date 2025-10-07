declare module "*.module.css"
declare module "!!raw-loader!*" {
  const content: string;
  export default content;
}
