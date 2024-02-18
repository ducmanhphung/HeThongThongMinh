import { useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";

function TmpPage() {
  const { id } = useParams();
  const go2Product = useRef();

  useEffect(() => {
    go2Product.current.click();
  }, []);
  return <Link ref={go2Product} to={`/product/${id}`}></Link>;
}

export default TmpPage;
