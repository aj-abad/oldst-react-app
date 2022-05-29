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
          <span className="h4 d-block mb-2">Face <small className="text-muted">#{id}</small></span>
          <span className="h5">{formattedPrice}</span>
          <br />
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
