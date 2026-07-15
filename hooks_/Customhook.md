A custom hook extracts reusable logic.


Instead of repeating:

useEffect(...)
useState(...)
fetch(...)

Create:

useProducts()

Example:

export function useProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  return { products };
}

Use:

const { products } = useProducts();
When to Create a Hook?

If the same logic is used 2 or more times, consider moving it into a custom hook.

Examples:

useAuth()
useNetwork()
useDebounce()
useTheme()
useLocation()