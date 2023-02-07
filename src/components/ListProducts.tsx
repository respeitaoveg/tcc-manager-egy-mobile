import { product } from '../types/api'
import Product from './Product'

export default function ListPrpoducts({ products }: { products: product[] | undefined}) {
  return <>
    {products && products.map((product, index) => {
        const {
          cod,
          descricao,
          estoqueAtual,
          id,
          imagemBase64,
          nome,
          nomeImagem,
          unidadeMedida,
          valorUnidade
        } = product

        return (
          <Product
            key={index}
            id={id}
            cod={cod}
            nome={nome}
            descricao={descricao}
            imagemBase64={imagemBase64}
            nomeImagem={nomeImagem}
            estoqueAtual={estoqueAtual}
            valorUnidade={valorUnidade}
            unidadeMedida={unidadeMedida}
          />
        )
      })
    }
  </>
}
