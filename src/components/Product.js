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
      <div className="row">
        <div className="col-lg-4">
          <div className="h5 mb-0">{formattedPrice}</div>
          <small className="text-muted">Added {formattedDate}</small>
        </div>
        <div className="col-lg-8 overflow-hidden">
          <code style={{ fontSize: `${size ?? 16}px`, whiteSpace: "nowrap" }}>
            {face}
          </code>
        </div>
      </div>
    </div>
  );
};

export default Product;
