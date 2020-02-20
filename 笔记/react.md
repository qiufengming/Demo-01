# 1、React
	## 1.1、安装、使用React脚手架
		```javascript
		npm install  -g create-react-app
		create-react-app my-app
		
		cd my-app
		npm start
		```
	## 1.2、Yarn
		1、Yarn是新一代包管理工具
		2、优点
			- 速度快
			- 安装版本统一、更安全
			- 更简洁的输出
			- 更好的语义化
		3、命令
			- yarn init
			- yarn add
			- yarn remove
			- yarn/yarn install
	## 1.3、React生命周期
		1、
			- getDefaultProps
			- getInitialState
			- componentWillMount
			- render
			- componentDidMount
			- componentWillReceiveProps
			- shouldComponentUpdate
			- componentWillUpdate
			- componentDidUpdate
			- ccomponentWillUnmount
	## 1.4、react-router与react-router-dom
	## 1.5、暴露react脚手架（create-react-app）创建的项目中的webpack
		1、package.json文件中有 "eject":"react-script eject"
			```json
			...
			"script":{
				...
				"eject":"react-script eject"
				...
			}
			...
			```
			直接在控制台运行 eject（如：yarn eject） 就可以暴露 webpack 文件
	
# 1、React







