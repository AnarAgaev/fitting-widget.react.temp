import useFittingStore from "../store"

const useActiveSketches = () => {
  const sketches = useFittingStore(store => store.sketches)

  const activeSketches = sketches
    .filter(sketch => sketch.active === true)

  return activeSketches.length > 0
}

export default useActiveSketches