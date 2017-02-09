import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Navigator,
    Image,
    TouchableHighlight,
    TouchableOpacity,
    View
} from 'react-native';

NavigationBarRouteMapper = {
    LeftButton(route, navigator, index, navState) {
        if (route.id === 'first') {
            return null;
        }
        previousRoute = navState.routeStack[index - 1];
        return (
            <TouchableOpacity onPress={() => navigator.pop() } style={ styles.navBarLeftButton }>
                <Image source={require('./back.png')} style={styles.backImage}/>
            </TouchableOpacity>
        )
    },
    RightButton(route, navigator, index, navState) {
        if (route.id === 'second') {
            return null;
        }
        return (
            <TouchableOpacity onPress={() => navigator.push({id: 'second', title: '第二页', data: "我是从第一页跳转过来的"})}
                                    style={ styles.navBarRightButton }>
                <Text style={[styles.navBarButtonText] }>下一页</Text>
            </TouchableOpacity>
        );
    },







                Title(route, navigator, index, navState) {
                return ( < Text style = {
                    [styles.navBarTitleText] } > { route.title } < /Text>);
                },
                };

                exportdefaultclassNavigatorDemoextendsComponent {
                render() {
                return ( < Navigator style = { styles.container }
                initialRoute = {
                    {id: "first", title: "第一页"} }
                renderScene = { this.renderNav }
                configureScene = {
                    (route, routeStack) => Navigator.SceneConfigs.HorizontalSwipeJump }
                navigationBar = { < Navigator.NavigationBar
                    routeMapper={ NavigationBarRouteMapper }
                    style={
                        {backgroundColor: 'white'} }
                />
                }
                />
                );
            }

                renderNav(route, nav) {
                switch (route.id) {
                case 'first' :
                return <FirstScreen navigator = { nav }
                title = "第一页" / > ;
                case 'second':
                return ( < SecondScreen navigator = { nav }
                title = "第二页"
                data = { route.data }
                />);
                }
                }
                }

                class FirstScreen extends Component {
                toSecond = () => {
                    this.props.navigator.push({id: "second", title: "第二页", data: "我是第二页"});
                }
                render() {
                return ( < View style = { styles.firstView } >
                < TouchableHighlight style = {
                    {padding: 10} }
                onPress = { this.toSecond }
                underlayColor = "blue" >
                < Text style = { styles.contentText } > 第一页 < /Text> < /TouchableHighlight> < /View>
                );
                }
                }

                class SecondScreen extends Component {
                toFirst = () => {
                    this.props.navigator.pop();
                }
                render() {
                return ( < View style = { styles.secondView } >
                < TouchableHighlight style = {
                    {padding: 10} }
                onPress = { this.toFirst }
                underlayColor = "red" >
                < Text style = { styles.contentText } > { this.props.data } < /Text> < /TouchableHighlight> < /View>
                );
                }
                }

                const styles = StyleSheet.create({
                backImage: {
                width: 15,
                height: 30,
            },
                navBarTitleText: {
                color: 'black',
                fontWeight: '500',
                marginTop: 20,
            },
                navBarLeftButton: {
                paddingLeft: 10,
                paddingTop: 15,
            },
                navBarRightButton: {
                paddingRight: 10,
                paddingTop: 20,
            },
                navBarButtonText: {
                color: '#5890FF',
            },
                container: {
                flex: 1,
            },
                firstView: {
                flex: 1,
                backgroundColor: 'red',
                justifyContent: 'center',
            },
                secondView: {
                flex: 1,
                justifyContent: 'center',
                backgroundColor: 'blue',
            },
                contentText: {
                fontSize: 22,
                color: 'white',
                textAlign: 'center',
            },
            });

                AppRegistry.registerComponent('NavigatorDemo', () => NavigatorDemo);
