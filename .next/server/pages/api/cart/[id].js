"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/cart/[id]";
exports.ids = ["pages/api/cart/[id]"];
exports.modules = {

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ "(api)/./middleware/auth.js":
/*!****************************!*\
  !*** ./middleware/auth.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _src_models_userModel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../src/models/userModel */ \"(api)/./src/models/userModel.js\");\n\n\nconst auth = async (req, res)=>{\n    try {\n        const token = req.headers[\"authorization\"];\n        if (!token) {\n            return res.status(400).json({\n                err: \"Invalid Authentication\"\n            });\n        }\n        const decoded = jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default().verify(token, \"tokenSecret123\");\n        if (!decoded) return res.status(400).json({\n            err: \"Invalid Authorization\"\n        });\n        const user = await _src_models_userModel__WEBPACK_IMPORTED_MODULE_1__[\"default\"].findOne({\n            _id: decoded.id\n        });\n        return {\n            id: user._id,\n            role: user.role,\n            root: user.root\n        };\n    } catch (error) {\n        return res.status(500).json({\n            err: error.message\n        });\n    }\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (auth);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9taWRkbGV3YXJlL2F1dGguanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUErQjtBQUNZO0FBRTNDLE1BQU1FLE9BQU8sT0FBT0MsS0FBS0MsTUFBUTtJQUMvQixJQUFJO1FBQ0YsTUFBTUMsUUFBUUYsSUFBSUcsT0FBTyxDQUFDLGdCQUFnQjtRQUMxQyxJQUFJLENBQUNELE9BQU87WUFDVixPQUFPRCxJQUFJRyxNQUFNLENBQUMsS0FBS0MsSUFBSSxDQUFDO2dCQUFFQyxLQUFLO1lBQXlCO1FBQzlELENBQUM7UUFDRCxNQUFNQyxVQUFVViwwREFBVSxDQUFDSyxPQUFPTyxnQkFBd0I7UUFDMUQsSUFBSSxDQUFDRixTQUFTLE9BQU9OLElBQUlHLE1BQU0sQ0FBQyxLQUFLQyxJQUFJLENBQUM7WUFBRUMsS0FBSztRQUF3QjtRQUN6RSxNQUFNTSxPQUFPLE1BQU1kLHFFQUFZLENBQUM7WUFBRWdCLEtBQUtQLFFBQVFRLEVBQUU7UUFBQztRQUNsRCxPQUFPO1lBQ0xBLElBQUlILEtBQUtFLEdBQUc7WUFDWkUsTUFBTUosS0FBS0ksSUFBSTtZQUNmQyxNQUFNTCxLQUFLSyxJQUFJO1FBQ2pCO0lBQ0YsRUFBRSxPQUFPQyxPQUFPO1FBQ2QsT0FBT2pCLElBQUlHLE1BQU0sQ0FBQyxLQUFLQyxJQUFJLENBQUM7WUFBRUMsS0FBS1ksTUFBTUMsT0FBTztRQUFDO0lBQ25EO0FBQ0Y7QUFFQSxpRUFBZXBCLElBQUlBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9lY29tbWVyY2UvLi9taWRkbGV3YXJlL2F1dGguanM/MWM5YyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgand0IGZyb20gXCJqc29ud2VidG9rZW5cIjtcclxuaW1wb3J0IFVzZXIgZnJvbSBcIi4uL3NyYy9tb2RlbHMvdXNlck1vZGVsXCI7XHJcblxyXG5jb25zdCBhdXRoID0gYXN5bmMgKHJlcSwgcmVzKSA9PiB7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHRva2VuID0gcmVxLmhlYWRlcnNbXCJhdXRob3JpemF0aW9uXCJdO1xyXG4gICAgaWYgKCF0b2tlbikge1xyXG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oeyBlcnI6IFwiSW52YWxpZCBBdXRoZW50aWNhdGlvblwiIH0pO1xyXG4gICAgfVxyXG4gICAgY29uc3QgZGVjb2RlZCA9IGp3dC52ZXJpZnkodG9rZW4sIHByb2Nlc3MuZW52LlRPS0VOX1NFQ1JFVCk7XHJcbiAgICBpZiAoIWRlY29kZWQpIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7IGVycjogXCJJbnZhbGlkIEF1dGhvcml6YXRpb25cIiB9KTtcclxuICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBVc2VyLmZpbmRPbmUoeyBfaWQ6IGRlY29kZWQuaWQgfSk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBpZDogdXNlci5faWQsXHJcbiAgICAgIHJvbGU6IHVzZXIucm9sZSxcclxuICAgICAgcm9vdDogdXNlci5yb290LFxyXG4gICAgfTtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgZXJyOiBlcnJvci5tZXNzYWdlIH0pO1xyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGF1dGg7XHJcbiJdLCJuYW1lcyI6WyJqd3QiLCJVc2VyIiwiYXV0aCIsInJlcSIsInJlcyIsInRva2VuIiwiaGVhZGVycyIsInN0YXR1cyIsImpzb24iLCJlcnIiLCJkZWNvZGVkIiwidmVyaWZ5IiwicHJvY2VzcyIsImVudiIsIlRPS0VOX1NFQ1JFVCIsInVzZXIiLCJmaW5kT25lIiwiX2lkIiwiaWQiLCJyb2xlIiwicm9vdCIsImVycm9yIiwibWVzc2FnZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./middleware/auth.js\n");

/***/ }),

/***/ "(api)/./src/models/cartModel.js":
/*!*********************************!*\
  !*** ./src/models/cartModel.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst cartSchema = new (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema)({\n    userId: {\n        type: (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema.Types.ObjectId),\n        ref: \"users\"\n    },\n    products: [\n        {\n            productId: {\n                type: (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema.Types.ObjectId),\n                ref: \"products\",\n                required: true\n            },\n            quantity: {\n                type: Number,\n                default: 1\n            }\n        }\n    ],\n    total: {\n        type: Number\n    },\n    couponCode: {\n        type: String\n    },\n    discount: {\n        type: Number,\n        default: 0\n    },\n    active: {\n        type: Boolean,\n        default: true\n    }\n}, {\n    timestamps: true\n});\nlet Dataset = (mongoose__WEBPACK_IMPORTED_MODULE_0___default().models.cart) || mongoose__WEBPACK_IMPORTED_MODULE_0___default().model(\"cart\", cartSchema);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Dataset);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvbW9kZWxzL2NhcnRNb2RlbC5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBZ0M7QUFFaEMsTUFBTUMsYUFBYSxJQUFJRCx3REFBZSxDQUNwQztJQUNFRyxRQUFRO1FBQ05DLE1BQU1KLHVFQUE4QjtRQUNwQ08sS0FBSztJQUNQO0lBQ0FDLFVBQVU7UUFDUjtZQUNFQyxXQUFXO2dCQUNUTCxNQUFNSix1RUFBOEI7Z0JBQ3BDTyxLQUFLO2dCQUNMRyxVQUFVLElBQUk7WUFDaEI7WUFDQUMsVUFBVTtnQkFDUlAsTUFBTVE7Z0JBQ05DLFNBQVM7WUFDWDtRQUNGO0tBQ0Q7SUFDREMsT0FBTztRQUNMVixNQUFNUTtJQUNSO0lBQ0FHLFlBQVk7UUFDVlgsTUFBTVk7SUFDUjtJQUNBQyxVQUFVO1FBQ1JiLE1BQU1RO1FBQ05DLFNBQVM7SUFDWDtJQUNBSyxRQUFRO1FBQ05kLE1BQU1lO1FBQ05OLFNBQVMsSUFBSTtJQUNmO0FBQ0YsR0FDQTtJQUNFTyxZQUFZLElBQUk7QUFDbEI7QUFHRixJQUFJQyxVQUFVckIsNkRBQW9CLElBQUlBLHFEQUFjLENBQUMsUUFBUUM7QUFFN0QsaUVBQWVvQixPQUFPQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZWNvbW1lcmNlLy4vc3JjL21vZGVscy9jYXJ0TW9kZWwuanM/NzllMCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbW9uZ29vc2UgZnJvbSBcIm1vbmdvb3NlXCI7XHJcblxyXG5jb25zdCBjYXJ0U2NoZW1hID0gbmV3IG1vbmdvb3NlLlNjaGVtYShcclxuICB7XHJcbiAgICB1c2VySWQ6IHtcclxuICAgICAgdHlwZTogbW9uZ29vc2UuU2NoZW1hLlR5cGVzLk9iamVjdElkLFxyXG4gICAgICByZWY6IFwidXNlcnNcIixcclxuICAgIH0sXHJcbiAgICBwcm9kdWN0czogW1xyXG4gICAgICB7XHJcbiAgICAgICAgcHJvZHVjdElkOiB7XHJcbiAgICAgICAgICB0eXBlOiBtb25nb29zZS5TY2hlbWEuVHlwZXMuT2JqZWN0SWQsXHJcbiAgICAgICAgICByZWY6IFwicHJvZHVjdHNcIixcclxuICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcXVhbnRpdHk6IHtcclxuICAgICAgICAgIHR5cGU6IE51bWJlcixcclxuICAgICAgICAgIGRlZmF1bHQ6IDEsXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIF0sXHJcbiAgICB0b3RhbDoge1xyXG4gICAgICB0eXBlOiBOdW1iZXIsXHJcbiAgICB9LFxyXG4gICAgY291cG9uQ29kZToge1xyXG4gICAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICB9LFxyXG4gICAgZGlzY291bnQ6IHtcclxuICAgICAgdHlwZTogTnVtYmVyLFxyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgfSxcclxuICAgIGFjdGl2ZToge1xyXG4gICAgICB0eXBlOiBCb29sZWFuLFxyXG4gICAgICBkZWZhdWx0OiB0cnVlLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIHtcclxuICAgIHRpbWVzdGFtcHM6IHRydWUsXHJcbiAgfVxyXG4pO1xyXG5cclxubGV0IERhdGFzZXQgPSBtb25nb29zZS5tb2RlbHMuY2FydCB8fCBtb25nb29zZS5tb2RlbChcImNhcnRcIiwgY2FydFNjaGVtYSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBEYXRhc2V0O1xyXG4iXSwibmFtZXMiOlsibW9uZ29vc2UiLCJjYXJ0U2NoZW1hIiwiU2NoZW1hIiwidXNlcklkIiwidHlwZSIsIlR5cGVzIiwiT2JqZWN0SWQiLCJyZWYiLCJwcm9kdWN0cyIsInByb2R1Y3RJZCIsInJlcXVpcmVkIiwicXVhbnRpdHkiLCJOdW1iZXIiLCJkZWZhdWx0IiwidG90YWwiLCJjb3Vwb25Db2RlIiwiU3RyaW5nIiwiZGlzY291bnQiLCJhY3RpdmUiLCJCb29sZWFuIiwidGltZXN0YW1wcyIsIkRhdGFzZXQiLCJtb2RlbHMiLCJjYXJ0IiwibW9kZWwiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./src/models/cartModel.js\n");

/***/ }),

/***/ "(api)/./src/models/userModel.js":
/*!*********************************!*\
  !*** ./src/models/userModel.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst userSchema = new (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema)({\n    name: {\n        type: String,\n        requried: true\n    },\n    email: {\n        type: String,\n        requried: true,\n        trim: true\n    },\n    password: {\n        type: String,\n        requried: true\n    },\n    role: {\n        type: String,\n        default: \"user\"\n    },\n    root: {\n        type: Boolean,\n        default: false\n    },\n    avatar: {\n        type: String,\n        default: \"https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png\"\n    }\n}, {\n    timestamps: true\n});\nlet Dataset = (mongoose__WEBPACK_IMPORTED_MODULE_0___default().models.user) || mongoose__WEBPACK_IMPORTED_MODULE_0___default().model(\"user\", userSchema);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Dataset);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvbW9kZWxzL3VzZXJNb2RlbC5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBZ0M7QUFFaEMsTUFBTUMsYUFBYSxJQUFJRCx3REFBZSxDQUNwQztJQUNFRyxNQUFNO1FBQ0pDLE1BQU1DO1FBQ05DLFVBQVUsSUFBSTtJQUNoQjtJQUNBQyxPQUFPO1FBQ0xILE1BQU1DO1FBQ05DLFVBQVUsSUFBSTtRQUNkRSxNQUFNLElBQUk7SUFDWjtJQUNBQyxVQUFVO1FBQ1JMLE1BQU1DO1FBQ05DLFVBQVUsSUFBSTtJQUNoQjtJQUNBSSxNQUFNO1FBQ0pOLE1BQU1DO1FBQ05NLFNBQVM7SUFDWDtJQUNBQyxNQUFNO1FBQ0pSLE1BQU1TO1FBQ05GLFNBQVMsS0FBSztJQUNoQjtJQUNBRyxRQUFRO1FBQ05WLE1BQU1DO1FBQ05NLFNBQ0U7SUFDSjtBQUNGLEdBQ0E7SUFDRUksWUFBWSxJQUFJO0FBQ2xCO0FBR0YsSUFBSUMsVUFBVWhCLDZEQUFvQixJQUFJQSxxREFBYyxDQUFDLFFBQVFDO0FBRTdELGlFQUFlZSxPQUFPQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZWNvbW1lcmNlLy4vc3JjL21vZGVscy91c2VyTW9kZWwuanM/YzRkYSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbW9uZ29vc2UgZnJvbSBcIm1vbmdvb3NlXCI7XHJcblxyXG5jb25zdCB1c2VyU2NoZW1hID0gbmV3IG1vbmdvb3NlLlNjaGVtYShcclxuICB7XHJcbiAgICBuYW1lOiB7XHJcbiAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgcmVxdXJpZWQ6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgZW1haWw6IHtcclxuICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICByZXF1cmllZDogdHJ1ZSxcclxuICAgICAgdHJpbTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBwYXNzd29yZDoge1xyXG4gICAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICAgIHJlcXVyaWVkOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIHJvbGU6IHtcclxuICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICBkZWZhdWx0OiBcInVzZXJcIixcclxuICAgIH0sXHJcbiAgICByb290OiB7XHJcbiAgICAgIHR5cGU6IEJvb2xlYW4sXHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgfSxcclxuICAgIGF2YXRhcjoge1xyXG4gICAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgXCJodHRwczovL3Jlcy5jbG91ZGluYXJ5LmNvbS9kZXZhdGNoYW5uZWwvaW1hZ2UvdXBsb2FkL3YxNjAyNzUyNDAyL2F2YXRhci9hdmF0YXJfY3VncTQwLnBuZ1wiLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIHtcclxuICAgIHRpbWVzdGFtcHM6IHRydWUsXHJcbiAgfVxyXG4pO1xyXG5cclxubGV0IERhdGFzZXQgPSBtb25nb29zZS5tb2RlbHMudXNlciB8fCBtb25nb29zZS5tb2RlbChcInVzZXJcIiwgdXNlclNjaGVtYSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBEYXRhc2V0O1xyXG4iXSwibmFtZXMiOlsibW9uZ29vc2UiLCJ1c2VyU2NoZW1hIiwiU2NoZW1hIiwibmFtZSIsInR5cGUiLCJTdHJpbmciLCJyZXF1cmllZCIsImVtYWlsIiwidHJpbSIsInBhc3N3b3JkIiwicm9sZSIsImRlZmF1bHQiLCJyb290IiwiQm9vbGVhbiIsImF2YXRhciIsInRpbWVzdGFtcHMiLCJEYXRhc2V0IiwibW9kZWxzIiwidXNlciIsIm1vZGVsIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./src/models/userModel.js\n");

/***/ }),

/***/ "(api)/./src/pages/api/cart/[id].js":
/*!************************************!*\
  !*** ./src/pages/api/cart/[id].js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"config\": () => (/* binding */ config),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _utils_connectDB__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/utils/connectDB */ \"(api)/./src/utils/connectDB.js\");\n/* harmony import */ var _middleware_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../middleware/auth */ \"(api)/./middleware/auth.js\");\n/* harmony import */ var _models_cartModel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../models/cartModel */ \"(api)/./src/models/cartModel.js\");\n\n\n\n(0,_utils_connectDB__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\nconst config = {\n    api: {\n        externalResolver: true\n    }\n};\n// eslint-disable-next-line import/no-anonymous-default-export\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (async (req, res)=>{\n    switch(req.method){\n        case \"POST\":\n            await addToCartForLogged(req, res);\n            break;\n        case \"GET\":\n            await getCart(req, res);\n            break;\n        case \"PATCH\":\n            await decreaseQuantity(req, res);\n            break;\n        case \"DELETE\":\n            await removeItem(req, res);\n            break;\n    }\n});\nconst addToCartForLogged = async (req, res)=>{\n    try {\n        const result = await (0,_middleware_auth__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(req, res);\n        const products = req.body;\n        if (result.id) {\n            let cart = await _models_cartModel__WEBPACK_IMPORTED_MODULE_2__[\"default\"].findOne({\n                userId: result.id\n            });\n            if (cart) {\n                if (products?.length > 0) {\n                    cart.products.forEach((obj)=>{\n                        const elementInArr2 = products.find((o)=>o.productId === obj.productId.toString());\n                        if (elementInArr2) obj.quantity = obj.quantity + elementInArr2.quantity;\n                    });\n                    let unique1 = products.filter(({ productId: id1  })=>!cart.products.some(({ productId: id2  })=>id2.toString() === id1));\n                    let final = [\n                        ...cart.products,\n                        ...unique1\n                    ];\n                    cart[\"products\"] = final;\n                    cart = await cart.save();\n                    return res.status(201).json({\n                        status: \"success\",\n                        Data: cart\n                    });\n                }\n            } else {\n                const newCart = await _models_cartModel__WEBPACK_IMPORTED_MODULE_2__[\"default\"].create({\n                    userId: result.id,\n                    products: products\n                });\n                return res.status(201).json({\n                    status: \"success\",\n                    Data: newCart\n                });\n            }\n        }\n    } catch (error) {\n        return res.status(500).json({\n            err: error.message\n        });\n    }\n};\nconst getCart = async (req, res)=>{\n    try {\n        const result = await (0,_middleware_auth__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(req, res);\n        if (result.id) {\n            const cart = await _models_cartModel__WEBPACK_IMPORTED_MODULE_2__[\"default\"].find({\n                userId: result.id\n            }).populate({\n                path: \"products\",\n                populate: {\n                    path: \"productId\",\n                    model: \"product\"\n                }\n            });\n            if (cart?.length === 0) {\n                return res.json({\n                    status: \"success\",\n                    msg: \"Nothing in the cart.\"\n                });\n            }\n            const totalFormat = cart[0];\n            const totalAmount = totalFormat.products?.reduce((acc, curr)=>curr?.productId?.discount > 0 ? acc + curr?.productId?.discountPrice * curr.quantity : acc + curr?.productId?.price * curr?.quantity, 0);\n            return res.json({\n                status: \"success\",\n                Data: {\n                    cart,\n                    totalAmount\n                }\n            });\n        }\n    } catch (error) {\n        return res.status(500).json({\n            err: error.message\n        });\n    }\n};\nconst decreaseQuantity = async (req, res)=>{\n    try {\n        const result = await (0,_middleware_auth__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(req, res);\n        const products = req.body;\n        console.log({\n            products\n        });\n        if (result.id) {\n            let cart = await _models_cartModel__WEBPACK_IMPORTED_MODULE_2__[\"default\"].findOne({\n                userId: result.id\n            });\n            console.log({\n                cart\n            });\n            if (cart) {\n                if (products?.length > 0) {\n                    cart.products.forEach((obj)=>{\n                        const elementInArr2 = products.find((o)=>o.productId === obj.productId.toString());\n                        if (elementInArr2 && obj?.quantity > 1) obj.quantity = obj.quantity - elementInArr2.quantity;\n                    });\n                    let unique1 = products.filter(({ productId: id1  })=>!cart.products.some(({ productId: id2  })=>id2.toString() === id1));\n                    let final = [\n                        ...cart.products,\n                        ...unique1\n                    ];\n                    cart[\"products\"] = final;\n                    cart = await cart.save();\n                    return res.status(201).json({\n                        status: \"success\",\n                        Data: cart\n                    });\n                }\n            }\n        }\n    } catch (error) {\n        return res.status(500).json({\n            err: error.message\n        });\n    }\n};\nconst removeItem = async (req, res)=>{\n    try {\n        const result = await (0,_middleware_auth__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(req, res);\n        const { productId  } = req.body;\n        if (result.id) {\n            let cart = await _models_cartModel__WEBPACK_IMPORTED_MODULE_2__[\"default\"].findOne({\n                userId: result.id\n            });\n            if (!cart) {\n                return res.status(400).json({\n                    err: \"Cart does not exist for this user.\"\n                });\n            }\n            if (!productId) {\n                return res.status(400).json({\n                    err: \"This product does not exist.\"\n                });\n            }\n            if (cart) {\n                if (productId) {\n                    let finalCart = cart.products.filter((obj)=>obj.productId.toString() !== productId);\n                    if (finalCart?.length === 0) {\n                        await _models_cartModel__WEBPACK_IMPORTED_MODULE_2__[\"default\"].findOneAndDelete({\n                            userId: result.id\n                        });\n                        return res.json({\n                            status: \"success\",\n                            msg: \"Cart Deleted\"\n                        });\n                    }\n                    cart[\"products\"] = finalCart;\n                    cart = await cart.save();\n                    return res.status(201).json({\n                        status: \"success\",\n                        Data: cart\n                    });\n                }\n            }\n        }\n    } catch (error) {\n        return res.status(500).json({\n            err: error.message\n        });\n    }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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NkIsTUFBTSxDQUFDLEtBQ1BDLElBQUksQ0FBQztvQkFBRUssS0FBSztnQkFBcUM7WUFDdEQsQ0FBQztZQUNELElBQUksQ0FBQ2hCLFdBQVc7Z0JBQ2QsT0FBT25CLElBQUk2QixNQUFNLENBQUMsS0FBS0MsSUFBSSxDQUFDO29CQUFFSyxLQUFLO2dCQUErQjtZQUNwRSxDQUFDO1lBQ0QsSUFBSXpCLE1BQU07Z0JBQ1IsSUFBSVMsV0FBVztvQkFDYixJQUFJZ0MsWUFBWXpDLEtBQUtILFFBQVEsQ0FBQ2dCLE1BQU0sQ0FDbEMsQ0FBQ1IsTUFBUUEsSUFBSUksU0FBUyxDQUFDQyxRQUFRLE9BQU9EO29CQUd4QyxJQUFJZ0MsV0FBV3RDLFdBQVcsR0FBRzt3QkFDM0IsTUFBTWxCLDBFQUFxQixDQUFDOzRCQUFFaUIsUUFBUU4sT0FBT0csRUFBRTt3QkFBQzt3QkFDaEQsT0FBT1QsSUFBSThCLElBQUksQ0FBQzs0QkFBRUQsUUFBUTs0QkFBV1csS0FBSzt3QkFBZTtvQkFDM0QsQ0FBQztvQkFDRDlCLElBQUksQ0FBQyxXQUFXLEdBQUd5QztvQkFDbkJ6QyxPQUFPLE1BQU1BLEtBQUtrQixJQUFJO29CQUN0QixPQUFPNUIsSUFBSTZCLE1BQU0sQ0FBQyxLQUFLQyxJQUFJLENBQUM7d0JBQUVELFFBQVE7d0JBQVdFLE1BQU1yQjtvQkFBSztnQkFDOUQsQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDO0lBQ0gsRUFBRSxPQUFPd0IsT0FBTztRQUNkLE9BQU9sQyxJQUFJNkIsTUFBTSxDQUFDLEtBQUtDLElBQUksQ0FBQztZQUFFSyxLQUFLRCxNQUFNRSxPQUFPO1FBQUM7SUFDbkQ7QUFDRiIsInNvdXJjZXMiOlsid2VicGFjazovL2Vjb21tZXJjZS8uL3NyYy9wYWdlcy9hcGkvY2FydC9baWRdLmpzPzVhYjIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNvbm5lY3REQiBmcm9tIFwiQC91dGlscy9jb25uZWN0REJcIjtcclxuaW1wb3J0IGF1dGggZnJvbSBcIi4uLy4uLy4uLy4uL21pZGRsZXdhcmUvYXV0aFwiO1xyXG5pbXBvcnQgQ2FydCBmcm9tIFwiLi4vLi4vLi4vbW9kZWxzL2NhcnRNb2RlbFwiO1xyXG5cclxuY29ubmVjdERCKCk7XHJcblxyXG5leHBvcnQgY29uc3QgY29uZmlnID0ge1xyXG4gIGFwaToge1xyXG4gICAgZXh0ZXJuYWxSZXNvbHZlcjogdHJ1ZSxcclxuICB9LFxyXG59O1xyXG5cclxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby1hbm9ueW1vdXMtZGVmYXVsdC1leHBvcnRcclxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgKHJlcSwgcmVzKSA9PiB7XHJcbiAgc3dpdGNoIChyZXEubWV0aG9kKSB7XHJcbiAgICBjYXNlIFwiUE9TVFwiOlxyXG4gICAgICBhd2FpdCBhZGRUb0NhcnRGb3JMb2dnZWQocmVxLCByZXMpO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgXCJHRVRcIjpcclxuICAgICAgYXdhaXQgZ2V0Q2FydChyZXEsIHJlcyk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBcIlBBVENIXCI6XHJcbiAgICAgIGF3YWl0IGRlY3JlYXNlUXVhbnRpdHkocmVxLCByZXMpO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgXCJERUxFVEVcIjpcclxuICAgICAgYXdhaXQgcmVtb3ZlSXRlbShyZXEsIHJlcyk7XHJcbiAgICAgIGJyZWFrO1xyXG4gIH1cclxufTtcclxuXHJcbmNvbnN0IGFkZFRvQ2FydEZvckxvZ2dlZCA9IGFzeW5jIChyZXEsIHJlcykgPT4ge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBhdXRoKHJlcSwgcmVzKTtcclxuICAgIGNvbnN0IHByb2R1Y3RzID0gcmVxLmJvZHk7XHJcblxyXG4gICAgaWYgKHJlc3VsdC5pZCkge1xyXG4gICAgICBsZXQgY2FydCA9IGF3YWl0IENhcnQuZmluZE9uZSh7IHVzZXJJZDogcmVzdWx0LmlkIH0pO1xyXG4gICAgICBpZiAoY2FydCkge1xyXG4gICAgICAgIGlmIChwcm9kdWN0cz8ubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgY2FydC5wcm9kdWN0cy5mb3JFYWNoKChvYmopID0+IHtcclxuICAgICAgICAgICAgY29uc3QgZWxlbWVudEluQXJyMiA9IHByb2R1Y3RzLmZpbmQoXHJcbiAgICAgICAgICAgICAgKG8pID0+IG8ucHJvZHVjdElkID09PSBvYmoucHJvZHVjdElkLnRvU3RyaW5nKClcclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChlbGVtZW50SW5BcnIyKVxyXG4gICAgICAgICAgICAgIG9iai5xdWFudGl0eSA9IG9iai5xdWFudGl0eSArIGVsZW1lbnRJbkFycjIucXVhbnRpdHk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIGxldCB1bmlxdWUxID0gcHJvZHVjdHMuZmlsdGVyKFxyXG4gICAgICAgICAgICAoeyBwcm9kdWN0SWQ6IGlkMSB9KSA9PlxyXG4gICAgICAgICAgICAgICFjYXJ0LnByb2R1Y3RzLnNvbWUoXHJcbiAgICAgICAgICAgICAgICAoeyBwcm9kdWN0SWQ6IGlkMiB9KSA9PiBpZDIudG9TdHJpbmcoKSA9PT0gaWQxXHJcbiAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICBsZXQgZmluYWwgPSBbLi4uY2FydC5wcm9kdWN0cywgLi4udW5pcXVlMV07XHJcbiAgICAgICAgICBjYXJ0W1wicHJvZHVjdHNcIl0gPSBmaW5hbDtcclxuXHJcbiAgICAgICAgICBjYXJ0ID0gYXdhaXQgY2FydC5zYXZlKCk7XHJcbiAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDEpLmpzb24oeyBzdGF0dXM6IFwic3VjY2Vzc1wiLCBEYXRhOiBjYXJ0IH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zdCBuZXdDYXJ0ID0gYXdhaXQgQ2FydC5jcmVhdGUoe1xyXG4gICAgICAgICAgdXNlcklkOiByZXN1bHQuaWQsXHJcbiAgICAgICAgICBwcm9kdWN0czogcHJvZHVjdHMsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAxKS5qc29uKHsgc3RhdHVzOiBcInN1Y2Nlc3NcIiwgRGF0YTogbmV3Q2FydCB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oeyBlcnI6IGVycm9yLm1lc3NhZ2UgfSk7XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3QgZ2V0Q2FydCA9IGFzeW5jIChyZXEsIHJlcykgPT4ge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBhdXRoKHJlcSwgcmVzKTtcclxuICAgIGlmIChyZXN1bHQuaWQpIHtcclxuICAgICAgY29uc3QgY2FydCA9IGF3YWl0IENhcnQuZmluZCh7IHVzZXJJZDogcmVzdWx0LmlkIH0pLnBvcHVsYXRlKHtcclxuICAgICAgICBwYXRoOiBcInByb2R1Y3RzXCIsXHJcbiAgICAgICAgcG9wdWxhdGU6IHtcclxuICAgICAgICAgIHBhdGg6IFwicHJvZHVjdElkXCIsXHJcbiAgICAgICAgICBtb2RlbDogXCJwcm9kdWN0XCIsXHJcbiAgICAgICAgfSxcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBpZiAoY2FydD8ubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgcmV0dXJuIHJlcy5qc29uKHsgc3RhdHVzOiBcInN1Y2Nlc3NcIiwgbXNnOiBcIk5vdGhpbmcgaW4gdGhlIGNhcnQuXCIgfSk7XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgdG90YWxGb3JtYXQgPSBjYXJ0WzBdO1xyXG5cclxuICAgICAgY29uc3QgdG90YWxBbW91bnQgPSB0b3RhbEZvcm1hdC5wcm9kdWN0cz8ucmVkdWNlKFxyXG4gICAgICAgIChhY2MsIGN1cnIpID0+XHJcbiAgICAgICAgICBjdXJyPy5wcm9kdWN0SWQ/LmRpc2NvdW50ID4gMFxyXG4gICAgICAgICAgICA/IGFjYyArIGN1cnI/LnByb2R1Y3RJZD8uZGlzY291bnRQcmljZSAqIGN1cnIucXVhbnRpdHlcclxuICAgICAgICAgICAgOiBhY2MgKyBjdXJyPy5wcm9kdWN0SWQ/LnByaWNlICogY3Vycj8ucXVhbnRpdHksXHJcbiAgICAgICAgMFxyXG4gICAgICApO1xyXG5cclxuICAgICAgcmV0dXJuIHJlcy5qc29uKHtcclxuICAgICAgICBzdGF0dXM6IFwic3VjY2Vzc1wiLFxyXG4gICAgICAgIERhdGE6IHsgY2FydCwgdG90YWxBbW91bnQgfSxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7IGVycjogZXJyb3IubWVzc2FnZSB9KTtcclxuICB9XHJcbn07XHJcblxyXG5jb25zdCBkZWNyZWFzZVF1YW50aXR5ID0gYXN5bmMgKHJlcSwgcmVzKSA9PiB7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGF1dGgocmVxLCByZXMpO1xyXG4gICAgY29uc3QgcHJvZHVjdHMgPSByZXEuYm9keTtcclxuICAgIGNvbnNvbGUubG9nKHsgcHJvZHVjdHMgfSk7XHJcbiAgICBpZiAocmVzdWx0LmlkKSB7XHJcbiAgICAgIGxldCBjYXJ0ID0gYXdhaXQgQ2FydC5maW5kT25lKHsgdXNlcklkOiByZXN1bHQuaWQgfSk7XHJcbiAgICAgIGNvbnNvbGUubG9nKHsgY2FydCB9KTtcclxuICAgICAgaWYgKGNhcnQpIHtcclxuICAgICAgICBpZiAocHJvZHVjdHM/Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgIGNhcnQucHJvZHVjdHMuZm9yRWFjaCgob2JqKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnRJbkFycjIgPSBwcm9kdWN0cy5maW5kKFxyXG4gICAgICAgICAgICAgIChvKSA9PiBvLnByb2R1Y3RJZCA9PT0gb2JqLnByb2R1Y3RJZC50b1N0cmluZygpXHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICBpZiAoZWxlbWVudEluQXJyMiAmJiBvYmo/LnF1YW50aXR5ID4gMSlcclxuICAgICAgICAgICAgICBvYmoucXVhbnRpdHkgPSBvYmoucXVhbnRpdHkgLSBlbGVtZW50SW5BcnIyLnF1YW50aXR5O1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBsZXQgdW5pcXVlMSA9IHByb2R1Y3RzLmZpbHRlcihcclxuICAgICAgICAgICAgKHsgcHJvZHVjdElkOiBpZDEgfSkgPT5cclxuICAgICAgICAgICAgICAhY2FydC5wcm9kdWN0cy5zb21lKFxyXG4gICAgICAgICAgICAgICAgKHsgcHJvZHVjdElkOiBpZDIgfSkgPT4gaWQyLnRvU3RyaW5nKCkgPT09IGlkMVxyXG4gICAgICAgICAgICAgIClcclxuICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgbGV0IGZpbmFsID0gWy4uLmNhcnQucHJvZHVjdHMsIC4uLnVuaXF1ZTFdO1xyXG4gICAgICAgICAgY2FydFtcInByb2R1Y3RzXCJdID0gZmluYWw7XHJcbiAgICAgICAgICBjYXJ0ID0gYXdhaXQgY2FydC5zYXZlKCk7XHJcbiAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDEpLmpzb24oeyBzdGF0dXM6IFwic3VjY2Vzc1wiLCBEYXRhOiBjYXJ0IH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oeyBlcnI6IGVycm9yLm1lc3NhZ2UgfSk7XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3QgcmVtb3ZlSXRlbSA9IGFzeW5jIChyZXEsIHJlcykgPT4ge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBhdXRoKHJlcSwgcmVzKTtcclxuICAgIGNvbnN0IHsgcHJvZHVjdElkIH0gPSByZXEuYm9keTtcclxuICAgIGlmIChyZXN1bHQuaWQpIHtcclxuICAgICAgbGV0IGNhcnQgPSBhd2FpdCBDYXJ0LmZpbmRPbmUoeyB1c2VySWQ6IHJlc3VsdC5pZCB9KTtcclxuICAgICAgaWYgKCFjYXJ0KSB7XHJcbiAgICAgICAgcmV0dXJuIHJlc1xyXG4gICAgICAgICAgLnN0YXR1cyg0MDApXHJcbiAgICAgICAgICAuanNvbih7IGVycjogXCJDYXJ0IGRvZXMgbm90IGV4aXN0IGZvciB0aGlzIHVzZXIuXCIgfSk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKCFwcm9kdWN0SWQpIHtcclxuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oeyBlcnI6IFwiVGhpcyBwcm9kdWN0IGRvZXMgbm90IGV4aXN0LlwiIH0pO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChjYXJ0KSB7XHJcbiAgICAgICAgaWYgKHByb2R1Y3RJZCkge1xyXG4gICAgICAgICAgbGV0IGZpbmFsQ2FydCA9IGNhcnQucHJvZHVjdHMuZmlsdGVyKFxyXG4gICAgICAgICAgICAob2JqKSA9PiBvYmoucHJvZHVjdElkLnRvU3RyaW5nKCkgIT09IHByb2R1Y3RJZFxyXG4gICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICBpZiAoZmluYWxDYXJ0Py5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgYXdhaXQgQ2FydC5maW5kT25lQW5kRGVsZXRlKHsgdXNlcklkOiByZXN1bHQuaWQgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiByZXMuanNvbih7IHN0YXR1czogXCJzdWNjZXNzXCIsIG1zZzogXCJDYXJ0IERlbGV0ZWRcIiB9KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGNhcnRbXCJwcm9kdWN0c1wiXSA9IGZpbmFsQ2FydDtcclxuICAgICAgICAgIGNhcnQgPSBhd2FpdCBjYXJ0LnNhdmUoKTtcclxuICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMSkuanNvbih7IHN0YXR1czogXCJzdWNjZXNzXCIsIERhdGE6IGNhcnQgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7IGVycjogZXJyb3IubWVzc2FnZSB9KTtcclxuICB9XHJcbn07XHJcbiJdLCJuYW1lcyI6WyJjb25uZWN0REIiLCJhdXRoIiwiQ2FydCIsImNvbmZpZyIsImFwaSIsImV4dGVybmFsUmVzb2x2ZXIiLCJyZXEiLCJyZXMiLCJtZXRob2QiLCJhZGRUb0NhcnRGb3JMb2dnZWQiLCJnZXRDYXJ0IiwiZGVjcmVhc2VRdWFudGl0eSIsInJlbW92ZUl0ZW0iLCJyZXN1bHQiLCJwcm9kdWN0cyIsImJvZHkiLCJpZCIsImNhcnQiLCJmaW5kT25lIiwidXNlcklkIiwibGVuZ3RoIiwiZm9yRWFjaCIsIm9iaiIsImVsZW1lbnRJbkFycjIiLCJmaW5kIiwibyIsInByb2R1Y3RJZCIsInRvU3RyaW5nIiwicXVhbnRpdHkiLCJ1bmlxdWUxIiwiZmlsdGVyIiwiaWQxIiwic29tZSIsImlkMiIsImZpbmFsIiwic2F2ZSIsInN0YXR1cyIsImpzb24iLCJEYXRhIiwibmV3Q2FydCIsImNyZWF0ZSIsImVycm9yIiwiZXJyIiwibWVzc2FnZSIsInBvcHVsYXRlIiwicGF0aCIsIm1vZGVsIiwibXNnIiwidG90YWxGb3JtYXQiLCJ0b3RhbEFtb3VudCIsInJlZHVjZSIsImFjYyIsImN1cnIiLCJkaXNjb3VudCIsImRpc2NvdW50UHJpY2UiLCJwcmljZSIsImNvbnNvbGUiLCJsb2ciLCJmaW5hbENhcnQiLCJmaW5kT25lQW5kRGVsZXRlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./src/pages/api/cart/[id].js\n");

/***/ }),

/***/ "(api)/./src/utils/connectDB.js":
/*!********************************!*\
  !*** ./src/utils/connectDB.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst connectDB = ()=>{\n    if ((mongoose__WEBPACK_IMPORTED_MODULE_0___default().connections[0].readyState)) {\n        console.log(\"Already connected.\");\n        return;\n    }\n    mongoose__WEBPACK_IMPORTED_MODULE_0___default().connect(\"mongodb+srv://pranav123:pranav123@ecommerce.inmos.mongodb.net/?retryWrites=true&w=majority\", {\n        useNewUrlParser: true\n    }).then((result)=>{\n        console.log(result);\n    }).catch((err)=>{\n        if (err) throw err;\n        console.log(\"Connected to mongoDB\");\n    });\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (connectDB);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvdXRpbHMvY29ubmVjdERCLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUFnQztBQUVoQyxNQUFNQyxZQUFZLElBQU07SUFDdEIsSUFBSUQsMkVBQWtDLEVBQUU7UUFDdENJLFFBQVFDLEdBQUcsQ0FBQztRQUNaO0lBQ0YsQ0FBQztJQUNETCx1REFDVSxDQUFDTyw0RkFBdUIsRUFBRTtRQUNoQ0csaUJBQWlCLElBQUk7SUFDdkIsR0FDQ0MsSUFBSSxDQUFDLENBQUNDLFNBQVc7UUFDaEJSLFFBQVFDLEdBQUcsQ0FBQ087SUFDZCxHQUNDQyxLQUFLLENBQUMsQ0FBQ0MsTUFBUTtRQUNkLElBQUlBLEtBQUssTUFBTUEsSUFBSTtRQUNuQlYsUUFBUUMsR0FBRyxDQUFDO0lBQ2Q7QUFDSjtBQUVBLGlFQUFlSixTQUFTQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZWNvbW1lcmNlLy4vc3JjL3V0aWxzL2Nvbm5lY3REQi5qcz9lYThkIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtb25nb29zZSBmcm9tIFwibW9uZ29vc2VcIjtcclxuXHJcbmNvbnN0IGNvbm5lY3REQiA9ICgpID0+IHtcclxuICBpZiAobW9uZ29vc2UuY29ubmVjdGlvbnNbMF0ucmVhZHlTdGF0ZSkge1xyXG4gICAgY29uc29sZS5sb2coXCJBbHJlYWR5IGNvbm5lY3RlZC5cIik7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG4gIG1vbmdvb3NlXHJcbiAgICAuY29ubmVjdChwcm9jZXNzLmVudi5NT05HT0RCX1VSTCwge1xyXG4gICAgICB1c2VOZXdVcmxQYXJzZXI6IHRydWUsXHJcbiAgICB9KVxyXG4gICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xyXG4gICAgfSlcclxuICAgIC5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICAgIGlmIChlcnIpIHRocm93IGVycjtcclxuICAgICAgY29uc29sZS5sb2coXCJDb25uZWN0ZWQgdG8gbW9uZ29EQlwiKTtcclxuICAgIH0pO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdERCO1xyXG4iXSwibmFtZXMiOlsibW9uZ29vc2UiLCJjb25uZWN0REIiLCJjb25uZWN0aW9ucyIsInJlYWR5U3RhdGUiLCJjb25zb2xlIiwibG9nIiwiY29ubmVjdCIsInByb2Nlc3MiLCJlbnYiLCJNT05HT0RCX1VSTCIsInVzZU5ld1VybFBhcnNlciIsInRoZW4iLCJyZXN1bHQiLCJjYXRjaCIsImVyciJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./src/utils/connectDB.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./src/pages/api/cart/[id].js"));
module.exports = __webpack_exports__;

})();