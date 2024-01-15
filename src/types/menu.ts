export interface IMenu {
  ID: number
  name: string
  slug: string
  description: string
  count: number
  items: IMenuItem[]
  meta: Meta
}

export interface IMenuItem {
  id: number
  order: number
  parent: number
  title: string
  url: string
  attr: string
  target: string
  classes: string
  xfn: string
  description: string
  object_id: number
  object: string
  object_slug: any
  type: string
  type_label: string
}

export interface Meta {
  links: Links
}

export interface Links {
  collection: string
  self: string
}
