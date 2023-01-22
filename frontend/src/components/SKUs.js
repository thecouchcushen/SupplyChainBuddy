import SkuEntry from "./SKU";

const SkuCatalog = ({ skus }) => {
    return (
        skus.map((sku, i) => 
          <SkuEntry key={sku.SKU + "CatalogEntry"} sku={sku} />
        )
    )
}

export default SkuCatalog