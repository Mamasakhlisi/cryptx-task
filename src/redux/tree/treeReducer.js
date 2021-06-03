export const getAllChildrens = (child) => {
  return { type: "GET", payload: child };
};

export const createChildren = (data, key, type, fileName, fileFormat) => {
  return function (dispatch, getState) {
    const { data } = getState().tree;

    // unique id
    function generateUUID() {
      var d = new Date().getTime();
      var d2 =
        (performance && performance.now && performance.now() * 1000) || 0;
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
          var r = Math.random() * 16; 
          if (d > 0) {
            r = (d + r) % 16 | 0;
            d = Math.floor(d / 16);
          } else {
            r = (d2 + r) % 16 | 0;
            d2 = Math.floor(d2 / 16);
          }
          return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
        }
      );
    }

    var newData = [];
    function countDown(fromNumber) {
      fromNumber.forEach((element, index) => {
        if (element.parent === 1) {
          if (element.key === key) {
            if (type === 1) {
              element.children.push({
                title: fileName,
                key: generateUUID(),
                id: generateUUID(),
                isLeaf: false,
                parent: 1,
                children: [],
              });
            } else {
              element.children.push({
                title: `${fileName}.${fileFormat}`,
                key: generateUUID(),
                id: generateUUID(),
                isLeaf: true,
                parent: 0,
              });
            }
          }

          countDown(element.children);
          newData = fromNumber;
        }
      });
    }
    countDown(data);
    return dispatch({ type: "NEW", payload: newData });
  };
};

const initialState = {
  childrens: [],
  data: [
    {
      title: "Folder",
      key: "0",
      id: 1,
      isLeaf: false,
      parent: 1,
      children: [],
    },
  ],
};

export const treeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET":
      return { ...state, childrens: [...state.childrens, action.payload] };
    case "NEW":
      return { ...state, data: action.payload };
    default:
      return state;
  }
};
