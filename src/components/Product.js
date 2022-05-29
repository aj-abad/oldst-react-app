import getDateDiff from "../plugins/getDateDiff";

const Product = ({ product }) => {
  const { date, face, id, price, size } = product;

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price / 100);

  const formattedDate = getDateDiff(new Date(date));

  return (
    <div className="product p-4">
    </div>
  );
};

export default Product;
