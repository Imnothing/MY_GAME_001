import { _decorator, Component, Node, Button, Event } from 'cc';
const { ccclass } = _decorator;

@ccclass
export default class auto_LoadingView extends Component {
	LoadingView: Node;
	bg: Node;
	loadingProgressBar: Node;
	Bar: Node;

	public static URL:string = "assets\loadingbundle\prefabs\LoadingView.prefab"

    onLoad () {
		this.LoadingView = this.node
		this.bg = this.LoadingView.getChildByName("bg");
		this.loadingProgressBar = this.LoadingView.getChildByName("loadingProgressBar");
		this.Bar = this.loadingProgressBar.getChildByName("Bar");

    }
}
