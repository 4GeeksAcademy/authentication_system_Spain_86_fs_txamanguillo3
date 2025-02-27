const loginDispatcher = {
	get: async (email, password) => {
		const response = await fetch(`${process.env.BACKEND_URL}/api/login`, {
			method: "POST",
			body: JSON.stringify({ email, password }),
			headers: { "Content-Type": "application/json" }
		})
		const data = await response.json()
		if (!response.ok) {
			return false
		}
		else {
			localStorage.setItem("token", data.token)
			return true
		}
	}
}



const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				},
			],
			profile: null,
			productList: [],
			promotionsList: [],
			filteredProducts: [],
			cart: [],
			totalCartAmount: 0
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			login: async (email, password) => {
				return loginDispatcher.get(email, password)
			},
			getProfile: async () => {
				const token = localStorage.getItem('token');
				const response = await fetch(`${process.env.BACKEND_URL}/api/profile`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						'Authorization': 'Bearer ' + token
					}
				})
				const profile = await response.json()
				const store = getStore()
				if (!response.ok) {
					setStore({ ...store, profile: null })
				}
				else {
					setStore({ ...store, profile })
				}
			},
			getProductList: async () => {
				const response = await fetch(`${process.env.BACKEND_URL}/api/products`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json"
					}
				});
				const productList = await response.json();
				const store = getStore();
				setStore({ ...store, productList, filteredProducts: productList });
				return productList;
			},
			getPromotionsList: async () => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/promotions`, {
						method: "GET",
						headers: { "Content-Type": "application/json" }
					});

					if (!response.ok) {
						throw new Error("Error al obtener las promociones");
					}

					const data = await response.json();

					const formattedPromotions = data.resources.map(promo => ({
						id: promo.public_id, // Cloudinary devuelve "public_id" en lugar de "id"
						price: Math.floor(Math.random() * 10) + 1, // No hay precio en Cloudinary, podrías agregarlo manualmente después
						description: "¡Promoción especial!", // Puedes cambiar esto si hay una descripción
						image_url: promo.secure_url // Usamos "secure_url" para la imagen
					}));

					setStore({ ...getStore(), promotionsList: formattedPromotions });
					return formattedPromotions;

				} catch (error) {
					console.error("Error cargando promociones:", error);
					setStore({ ...getStore(), promotionsList: [] });
				}
			},

			deletePromotion: async (id) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/promotions/${id}`, {
						method: "DELETE",
						headers: { "Content-Type": "application/json" }
					});

					if (!response.ok) {
						throw new Error("Error al eliminar promoción");
					}

					console.log(`✅ Promoción ${id} eliminada correctamente`);

					const updatedPromotions = getStore().promotionsList.filter(promo => promo.id !== id);
					setStore({ promotionsList: updatedPromotions });

					return true;
				} catch (error) {
					console.error("❌ Error eliminando promoción:", error);
					return false;
				}
			},
			searchProducts: (searchTerm) => {
				const store = getStore();

				if (!searchTerm.trim()) {
					setStore({ filteredProducts: [...store.productList] });
					return;
				}

				const normalizeText = (text) =>
					text?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

				const searchQuery = normalizeText(searchTerm);

				const filtered = store.productList.filter((product) => {
					const productName = normalizeText(product.title || "");
					const productDescription = normalizeText(product.description || "");

					return productName.includes(searchQuery) || productDescription.includes(searchQuery);
					
				});
				setStore({ ...getStore(), filteredProducts: filtered });		
			},
			addProduct: async (product) => {
				const response = await fetch(`${process.env.BACKEND_URL}/api/products`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(product)
				});
				const data = await response.json();
				return data;
			},
			addPromotion: async (promotion) => {
				const response = await fetch(`${process.env.BACKEND_URL}/api/promotions`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(promotion)
				});
				const data = await response.json();
				return data;
			},
			agregarAlCarrito: (product) => {
				const { cart } = getStore()

				const yaExisteElProducto = cart.findIndex(
					(articulo) => articulo.id === product.id
				);
				if (yaExisteElProducto >= 0) {
					const carritoActualizado = [...cart];
					carritoActualizado[yaExisteElProducto].cantidad += 1;
					setStore({ cart: carritoActualizado });
				} else {
					setStore({ cart: [...cart, { ...product, cantidad: 1 }] });
				}
				const actions = getActions()
				actions.updateCartTotalAmount()
			},
			eliminarProducto: () => {

			},
			actualizarCarrito: (productos) => {
				setStore({ cart: productos })
			},
			updateCartTotalAmount: () => {
				const store = getStore()
				const cartTotalAmount = store.cart.reduce((acc, product) => {
					acc = (product.price * product.cantidad) + acc
					return acc
				}, 0)
				setStore({ ...store, cartTotalAmount })
			}
		}
	};
};

export default getState;
