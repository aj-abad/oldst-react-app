import getDateDiff from "../plugins/getDateDiff";

const Product = ({ product }) => {
  const { date, face, id, price, size } = product;

  //assuming that native JavaScript APIs are allowed
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price / 100);

  const formattedDate = getDateDiff(new Date(date));

  return (
    <div className="product mb-4">
      <div className="product-info p-4">
        <div className="mb-2">
          <span className="h4 d-block mb-2">
            Face <small className="text-muted">#{id}</small>
          </span>
          <span className="h5">{formattedPrice}</span>
        </div>
        <small className="text-muted">Added {formattedDate}</small>
        <br />
        <small> Size: {size} </small>
      </div>
      <div className="product-preview p-4 user-select-none d-flex align-items-center">
        {/* Sets the font size of the preview to be the product's
            size multipied by the font-size of its parent element,
            which is 1 on large screens and 20% of the viewport
            width on smaller screens, just to make it responsive
          */}
        <code style={{ fontSize: `${size}em`, whiteSpace: "nowrap" }}>
          {face}
        </code>
      </div>
    </div>
  );
};

export default Product;
