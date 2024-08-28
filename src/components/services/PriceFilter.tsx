import { createSignal, type Component } from "solid-js"

// interface Props {
//   filterPostsByPrice: (priceInBtw: number[]) => void;
// }

// export const PriceFilter: Component<Props> = (props) => {
export const PriceFilter: Component = () => {
  const [selectedPrices, setSelectedPrices] = createSignal<Array<number>>([])
  const [priceFilter, setPriceFilter] = createSignal<Array<number>>([0, 100])

  const updateMinPricePlaceHolder = (n: string) => {
    let newMin = Number(n)
    setPriceFilter([newMin, priceFilter()[1]])
    console.log(priceFilter())
  }

  const updateMaxPricePlaceHolder = (n: string) => {
    let newMax = Number(n)
    setPriceFilter([priceFilter()[0], newMax])
    console.log(priceFilter())
  }

  return (
    <h1>hola</h1>
  )
}
