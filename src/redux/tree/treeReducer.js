export const getAllChildrens = (child) => {
  return { type: "GET", payload: child };
};

export const createChildren = (key) => {
  return function (dispatch, getState) {
    const { data } = getState().tree;

    function countDown(fromNumber) {
      fromNumber.forEach((element) => {
        if (element.parent === 1) {
          if (element.key === "0-1-2") {
            console.log(element);
            element.children.push({
              title: "new file",
              key: "0-1-4",
              isLeaf: true,
              parent: 0,
            });
          }
          countDown(element.children);
        }
      });
    }
    const dt = countDown(data);
    return dispatch({ type: "NEW", payload: dt });
  };
};

const initialState = {
  childrens: [],
  data: [
    {
      title: "დათოს ფოლდერი",
      key: "0",
      isLeaf: false,
      parent: 1,
      children: [
        {
          title: "File Name",
          key: "0-0",
          isLeaf: true,
          parent: 0,
        },

      ],
    },
  ],
};

export const treeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET":
      return { ...state, childrens: [...state.childrens, action.payload] };
    case "NEW":
      console.log(action.payload)
      return state;

    default:
      return state;
  }
};
