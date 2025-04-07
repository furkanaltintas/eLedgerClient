export class MenuModel {
  title: string ="";
  icon: string = "";
  url: string = "";
  showThisMenuJustAdmin: boolean = false;
  subMenus: MenuModel[] = [];
}
