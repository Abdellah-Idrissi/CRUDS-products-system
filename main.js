let titleInput = document.querySelector('.title__input')
let priceInput = document.querySelector('.price__input')
let taxesInput = document.querySelector('.taxes__input')
let adsInput = document.querySelector('.ads__input')
let discountInput = document.querySelector('.discount__input')
let countInput = document.querySelector('.count__input')
let categoryInput = document.querySelector('.category__input')
let createButton = document.querySelector('.create__button')
let totalContainer = document.querySelector('.total__container')
let totalelement = document.querySelector('.total__element')
let serchMethod = document.querySelector('.search__method')
let searchForm = document.querySelector('.search__form')
let searchInput = document.querySelector('.search__input')
let deleteAllButton = document.querySelector('.delete__all')
let productsNumbers = document.querySelector('.products__numb')
let tableBody = document.querySelector('.table__body')
let products = localStorage.getItem('products')
let searchMood = 'search__title'


function productStructureMaker(id,title,price,taxes,ads,discount,count,total,category) {
  
  let tr = document.createElement('tr')
  tr.classList.add('visible')

  tr.innerHTML = `
  <td class='id'>${id}</td>
  <td class='title'>${title}</td>
  <td class='price'>${price}</td>
  <td class='taxes'>${taxes}</td>
  <td class='ads'>${ads}</td>
  <td class='discount'>${discount}</td>
  <td class='count'>${count}</td>
  <td class='total'>${total}</td>
  <td class='category'>${category}</td>
  <td><button class="update">UPDATE</button></td>
  <td><button class="delete">DELETE</button></td>
  <td><button class="plus">+</button></td>
  <td><button class="minus">-</button></td>
  `

  return tr
}

function emptyInputsFun() {
  titleInput.value = ''
  priceInput.value = ''
  taxesInput.value = ''
  adsInput.value = ''
  discountInput.value = ''
  countInput.value = ''
  categoryInput.value = ''
}

function AddEventsToTr(tr) {
  let deleteBtn = tr.querySelector('.delete')
  let updateBtn = tr.querySelector('.update')
  let plusBtn = tr.querySelector('.plus')
  let minusBtn = tr.querySelector('.minus')

  function deleteLastProduct() {
    let length = document.querySelectorAll('.table__body tr').length

    if(length !== 1) {
      products = localStorage.getItem('products')
      let productsArr = JSON.parse(products)
  
      productsArr.splice(`${+tr.firstElementChild.innerHTML - 1}`,1)
  
      localStorage.setItem('products',JSON.stringify(productsArr))
  
      tr.remove()
  
      trs = document.querySelectorAll('.table__body tr')
  
      productsNumbers.innerHTML--
  
      trs.forEach((tr,index)=> {
        tr.firstElementChild.innerHTML = index + 1
      })
    }

    else {
      tableBody.innerHTML = ''
      localStorage.removeItem('products')
      productsNumbers.innerHTML = 0
    }
  }

  deleteBtn.addEventListener('click',()=> {
    deleteLastProduct()
  })

  updateBtn.addEventListener('click',()=> {
    titleInput.value = `${tr.querySelector('.title').innerHTML}`
    priceInput.value = `${tr.querySelector('.price').innerHTML}`
    taxesInput.value = `${tr.querySelector('.taxes').innerHTML}`
    adsInput.value = `${tr.querySelector('.ads').innerHTML}`
    discountInput.value = `${tr.querySelector('.discount').innerHTML}`
    countInput.value = `${tr.querySelector('.count').innerHTML}`
    categoryInput.value = `${tr.querySelector('.category').innerHTML}`
    totalContainer.classList.add('yes__total')
    totalContainer.classList.remove('no__total')
    totalelement.innerHTML = `${tr.querySelector('.total').innerHTML}`

    localStorage.setItem('updateProductId',tr.querySelector('.id').innerHTML - 1)
    createButton.value = 'UPDATE'
    createButton.classList.add('update')
  })

  plusBtn.addEventListener('click',()=> {
    tr.querySelector('.count').innerHTML++

    let productsArr = JSON.parse(localStorage.getItem('products'))

    productsArr[+tr.querySelector('.id').innerHTML - 1].count = tr.querySelector('.count').innerHTML

    localStorage.setItem('products',JSON.stringify(productsArr))
  })

  minusBtn.addEventListener('click',()=> {
    if(+tr.querySelector('.count').innerHTML !== 1) {
      tr.querySelector('.count').innerHTML--

      let productsArr = JSON.parse(localStorage.getItem('products'))
  
      productsArr[+tr.querySelector('.id').innerHTML - 1].count = tr.querySelector('.count').innerHTML
  
      localStorage.setItem('products',JSON.stringify(productsArr))
    }

    else {
      deleteLastProduct()
    }
  })
}

function editTotal() {
  totalContainer.classList.remove('yes__total')
  totalContainer.classList.add('no__total')

  totalelement.innerHTML = ''
}

function addTotalResult() {
  
    let priceValue = priceInput.value == false ? 0 : +priceInput.value
    let taxesValue = taxesInput.value == false ? 0 : +taxesInput.value
    let adsValue = adsInput.value == false ? 0 : +adsInput.value
    let discountValue = discountInput.value == false ? 0 : +discountInput.value 


    totalelement.innerHTML = priceValue + taxesValue + adsValue - discountValue

    totalContainer.classList.remove('no__total')
    totalContainer.classList.add('yes__total')
}

// After every reload restore the stored data
if(products !== null) {
  let productsArr = JSON.parse(products)

  let fragment = document.createDocumentFragment()

  let i = 0
  for(i ; i < productsArr.length ; i++) {

    tableBody.append(productStructureMaker(i+1,productsArr[i].title,productsArr[i].price,productsArr[i].taxes,productsArr[i].ads,productsArr[i].discount,productsArr[i].count,productsArr[i].total,productsArr[i].category))
  }

  productsNumbers.innerHTML = i
}

// Add events to the restored data in every reload
let trs = document.querySelectorAll('.table__body tr')
trs.forEach((tr)=> {
  AddEventsToTr(tr)
})


// Create or update a product
createButton.addEventListener('click',(e)=> {
  
  let emptyInputs = true
  
  // If any input is empty don't complete the proccess
  if(titleInput.value == false || priceInput.value == false || taxesInput.value == false || adsInput.value == false || countInput.value == false || categoryInput.value == false) {

    alert('Please fill the Input fields')
    
    emptyInputs = false
  }

  let titleValue = titleInput.value
  let priceValue = priceInput.value
  let taxesValue = taxesInput.value
  let adsValue = adsInput.value
  let discountValue = discountInput.value == false ? 0 : discountInput.value 
  let countValue = countInput.value
  let totalValue = totalelement.innerHTML
  let categoryValue = categoryInput.value

  // If the mood is update mood
  if(createButton.classList.contains('update') && emptyInputs) {
    let productsArr = JSON.parse(localStorage.getItem('products'))
    let i = JSON.parse(localStorage.getItem('updateProductId'))

    productsArr[i].title = titleValue
    productsArr[i].price = priceValue
    productsArr[i].taxes = taxesValue
    productsArr[i].ads = adsValue
    productsArr[i].discount = discountValue
    productsArr[i].count = countValue
    productsArr[i].total = totalValue
    productsArr[i].category = categoryValue

    localStorage.setItem('products',JSON.stringify(productsArr))
    
    tableBody.querySelector(`:nth-child(${i+1})`).querySelector('.title').innerHTML = titleValue
    tableBody.querySelector(`:nth-child(${i+1})`).querySelector('.price').innerHTML = priceValue
    tableBody.querySelector(`:nth-child(${i+1})`).querySelector('.taxes').innerHTML = taxesValue
    tableBody.querySelector(`:nth-child(${i+1})`).querySelector('.ads').innerHTML = adsValue
    tableBody.querySelector(`:nth-child(${i+1})`).querySelector('.discount').innerHTML = discountValue
    tableBody.querySelector(`:nth-child(${i+1})`).querySelector('.count').innerHTML = countValue
    tableBody.querySelector(`:nth-child(${i+1})`).querySelector('.total').innerHTML = totalValue
    tableBody.querySelector(`:nth-child(${i+1})`).querySelector('.category').innerHTML = categoryValue

    emptyInputsFun()
    editTotal()
    createButton.classList.remove('update')
    createButton.value = 'CREATE'
    localStorage.removeItem('updateProductId')
  }

  // If the mood is create mood
  else if(createButton.classList.contains('update') === false && emptyInputs) {
    products = localStorage.getItem('products')
  
    if(products === null && emptyInputs) {
  
      let product = {
        title: titleValue,
        price: priceValue,
        taxes: taxesValue,
        ads: adsValue,
        discount: discountValue,
        count: countValue,
        total: totalValue,
        category: categoryValue
      }
  
      localStorage.setItem('products',JSON.stringify([product]))
  
      let pr = productStructureMaker(1,titleValue,priceValue,taxesValue,adsValue,discountValue,countValue,totalValue,categoryValue)
      tableBody.append(pr)    
  
      //
      productsNumbers.innerHTML = 1
  
      AddEventsToTr(tableBody.lastElementChild)
  
      emptyInputsFun()
      
      editTotal()
    }
  
    else if (products !== null && emptyInputs === true) {
      let product = {
        title: titleValue,
        price: priceValue,
        taxes: taxesValue,
        ads: adsValue,
        discount: discountValue,
        count: countValue,
        total: totalValue,
        category: categoryValue
      }
  
      let productsArr = JSON.parse(products)
  
      productsArr.push(product)
  
      localStorage.setItem('products',JSON.stringify(productsArr))
  
      let id = productsArr.length == 1 ? productsArr.length - 1 : productsArr.length
  
      let pr = productStructureMaker(id,titleValue,priceValue,taxesValue,adsValue,discountValue,countValue,totalValue,categoryValue)
      tableBody.append(pr)
  
      AddEventsToTr(tableBody.lastElementChild)
  
      productsNumbers.innerHTML++
  
      emptyInputsFun()
      editTotal()
    }
  }
  
  e.preventDefault()
})


// Delete all the current products
deleteAllButton.addEventListener('click',()=> {
  trs = document.querySelectorAll('.table__body tr')
  let productsArr = JSON.parse(localStorage.getItem('products'))
  let newArr = []


  for(let i = 0 ; i < trs.length ; i++) {
    if(trs[i].classList.contains('visible') === false) {
      newArr.push(productsArr[i])
    }
  }

  if(productsArr.length >= 1) {
    localStorage.setItem('products',JSON.stringify(newArr))
  }

  else {
    localStorage.removeItem('products')
  }

  location.reload();
})


// Generate the Total if all inputs are not empty 
priceInput.addEventListener('change',addTotalResult)
taxesInput.addEventListener('change',addTotalResult)
adsInput.addEventListener('change',addTotalResult)
discountInput.addEventListener('change',addTotalResult)


// Set the searchMood
serchMethod.addEventListener('change',()=> {
  let i = serchMethod.selectedIndex
  searchMood = serchMethod.options[i].value

  if(searchMood === 'search__title') {
    searchInput.placeholder = 'Search by Title'
  }

  else {
    searchInput.placeholder = 'Search by Category'
  }
})

// Stop the form trigger while pressing enter
searchForm.addEventListener('submit',(e)=> {
  e.preventDefault()
})

// Filter result in search 
searchInput.addEventListener('input',()=> {
  let value = searchInput.value.toLowerCase()
  trs = document.querySelectorAll('.table__body tr')
  let totalCount = 0

  if(searchMood === 'search__title') {
    trs.forEach((tr)=> {
      let trTitle = tr.querySelector('.title').innerHTML.toLowerCase()
      if(trTitle.includes(value)) {
        tr.classList.remove('hidden')
        tr.classList.add('visible')
        totalCount++
      }

      else {
        tr.classList.remove('visible')
        tr.classList.add('hidden')
      }
    })
  }

  else {
    trs.forEach((tr)=> {
      let trCategory = tr.querySelector('.category').innerHTML.toLowerCase()
      if(trCategory.includes(value)) {
        tr.classList.remove('hidden')
        tr.classList.add('visible')
        totalCount++
      }

      else {
        tr.classList.remove('visible')
        tr.classList.add('hidden')
      }
    })
  }

  productsNumbers.innerHTML = totalCount
})
