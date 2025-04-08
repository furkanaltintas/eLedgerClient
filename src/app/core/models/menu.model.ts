export class MenuModel {
  title: string ="";
  icon: string = "";
  url: string = "";
  noUrl?: boolean = false;
  showThisMenuJustAdmin?: boolean = false;
  subMenus?: MenuModel[] = [];
}
