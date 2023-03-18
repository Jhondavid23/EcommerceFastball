const createSlice = require('@reduxjs/toolkit').createSlice
const {fetchProductById, fetchProduct, fetchUpdateProduct, fetchDeleteProduct, fetchCreateProduct, setFilter} = require('./../actions/productAction')

const initialState = {
    allProducts : [],
    filteredProducts: [],
    configFilter: {
        name: '',
        categoryId: '',
        order: ['name', 'asc'],
    },
    productDetail : {},
    currentPage : 1,
    status : null,
}

const orderingProducts = (order, products)=>{
    const typeOrder = [order[0]]

    return order[1] === 'asc'
      ? [...products.sort( ( product, nextproduct )=> {
        if( product[ typeOrder ] > nextproduct[ typeOrder ] ) return 1
        if( product[ typeOrder ] < nextproduct[ typeOrder ] ) return -1
        return 0
      })]
      : [...products.sort( ( product, nextproduct )=> {
        if( product[ typeOrder ] > nextproduct[ typeOrder ] ) return -1
        if( product[ typeOrder ] < nextproduct[ typeOrder ] ) return 1
        return 0
      })]
}

const applyFilters = ( filters, products )=> {
    let filteredProducts = products

    if(filters.name)
        filteredProducts = filteredProducts.filter( prod => prod.name.toLowerCase().includes(filters.name.toLowerCase()))
    
    if(filters.categoryId)
        filteredProducts = filteredProducts.filter( prod => prod.CategoryId === filters.categoryId )
    
    return orderingProducts(filters.order, filteredProducts)
}

const productSlice = createSlice({
    name : "product",
    initialState,
    reducers : {
        changePage : (state, action)=> {
            state.currentPage = action.payload
        }
    },
    extraReducers : (builder)=>{
        builder.addCase(setFilter.pending, (state, action)=> {
            state.status = 'pending';
        })
        builder.addCase(setFilter.fulfilled, (state, action)=> {
            state.configFilter = action.payload
            state.filteredProducts = applyFilters( state.configFilter, state.allProducts )
            state.status = 'success';
        })
        builder.addCase(setFilter.rejected, (state,action)=> {
            state.status = 'rejected'
        })
        builder.addCase(fetchProduct.pending, (state, action)=> {
            state.status = 'pending';
        })
        builder.addCase(fetchProduct.fulfilled, (state,action)=> {
            state.allProducts = action.payload
            state.filteredProducts = applyFilters( state.configFilter, state.allProducts )
            state.status = 'success';
        })
        builder.addCase(fetchProduct.rejected, (state,action)=> {
            state.status = 'rejected'
        })
        builder.addCase(fetchCreateProduct.pending, (state,action)=>{
            state.status = 'pending';
        })
        
        builder.addCase(fetchCreateProduct.fulfilled, (state,action)=> {
            state.status = 'success';
            state.allProducts = state.allProducts.push(action.payload)
        })
        builder.addCase(fetchCreateProduct.rejected, (state, action)=> {
            state.status = 'rejected'
        })
    }
})

module.exports = productSlice.reducer
module.exports.productActions = productSlice.actions
