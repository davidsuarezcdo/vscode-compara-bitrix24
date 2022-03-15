export enum UrlType {
  folder = "fileman_admin",
  file = "fileman_file_edit",
}

export enum UrlEnvironment {
  dev = "bitrix-dev",
  prod = "crm",
}

const defaultParams = {
  [UrlType.file]: {},
  [UrlType.folder]: {
    ["PAGEN_1"]: "1",
    ["SIZEN_1"]: "20",
    ["show_perms_for"]: "0",
    ["check_for_file"]: "Y",
    site: "s1",
  },
};

export function resolveUrl(filepath: any, env: UrlEnvironment, type: UrlType): string {
  const [, relativePath] = filepath.split("/bitrix/");

  const bitrixPath = type === UrlType.folder ? getFolderPath(relativePath) : relativePath;

  const params = objectToParams({
    ...defaultParams[type],
    lang: "la",
    path: `/bitrix/${bitrixPath}`,
  });

  return `https://${env}.comparaonline.com/bitrix/admin/${type}.php?${params}`;
}

function getFolderPath(filepath: string): string {
  return filepath.substring(0, filepath.lastIndexOf("/"));
}

function objectToParams(obj: { [key: string]: string | number }): string {
  let tpl = [];
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      tpl.push(`${key}=${encodeURIComponent(obj[key])}`);
    }
  }
  return tpl.join("&");
}
