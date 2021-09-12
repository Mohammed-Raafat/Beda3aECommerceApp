export const getTotalPriceFromShoppingCart = (arr) => {
  return arr
    .map((item) => item.product.price * item.quantity)
    .reduce((tot, num) => tot + num)
    .toFixed(2);
};

export const sortArrOfObjBy = (arr, value, ascOrDesc = "asc") => {
  if (ascOrDesc === "asc") {
    return arr.sort((a, b) => {
      if (a[value] < b[value]) return -1;
      if (a[value] > b[value]) return 1;
      return 0;
    });
  } else if (ascOrDesc === "desc") {
    return arr.sort((a, b) => {
      if (a[value] > b[value]) return -1;
      if (a[value] < b[value]) return 1;
      return 0;
    });
  }
};

export const getUniquePropsFromArrOfObj = (arr, prop) => {
  return [...new Set(arr.map((item) => item[prop]))];
};

export const getMinMax = (arr, value) => {
  return {
    start: Math.min.apply( null, arr.map((item) => item[value]) ),
    end: Math.max.apply( null, arr.map((item) => item[value]) ),
  };
};

export const isAllFalse = (obj) => {
  for (let prop in obj) {
    if (obj[prop] === true) {
      return false;
    }
  }

  return true;
};

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.substring(1);
};

export const addToArray = (arr, element) => {
  return [...arr, element];
};

export const deleteFromArray = (arr, elementId) => {
  return arr.filter((element) => element.id !== elementId);
};

export const editInArray = (arr, objId, objProp, newValue) => {
  return arr.map((obj) => {
    if (obj.id === objId) {
      return { 
        ...obj,
        [objProp]: newValue
      };
    } else {
      return obj;
    }
  });
};

export const isInArray = (arr, element) => {
  const index = arr.indexOf(element);
  return index !== -1;
};

export const getValueFromArrOfObj = (arr, obj, prop) => {
  const index = arr.indexOf(obj);
  if (index === -1) {
    return null;
  } else {
    return arr[index][prop] || null;
  }
};

export const productsFilteredByCategories = (products, categories) => {
  return products.filter((product) => categories[product.category]);
};

export const productsFilteredByPrice = (products, price) => {
  return products.filter(
    (product) => product.price >= price.start && product.price <= price.end
  );
};