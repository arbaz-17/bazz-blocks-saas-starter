

export function badgeToneClasses(tone = "neutral") {
  switch (tone) {
    case "success":
      return "border-emerald-500/40 text-emerald-600 dark:text-emerald-400 bg-emerald-500/5";
    case "warning":
      return "border-amber-500/40 text-amber-700 dark:text-amber-400 bg-amber-500/5";
    case "danger":
      return "border-red-500/40 text-red-600 dark:text-red-400 bg-red-500/5";
    default:
      return "border-border text-muted-foreground bg-background/40";
  }
}

export function isItemActive(item, currentPath) {
  if (!item?.href) return false;
  if (item.exact) return currentPath === item.href;

  try {
    const hrefNoQuery = item.href.split("?")[0];
    return currentPath === hrefNoQuery || currentPath.startsWith(hrefNoQuery + "/");
  } catch {
    return false;
  }
}

export function isItemOrChildActive(item, currentPath) {
  if (isItemActive(item, currentPath)) return true;
  if (item.children?.length) {
    return item.children.some((child) => isItemActive(child, currentPath));
  }
  return false;
}

export function findActiveGroupId(sections, currentPath) {
  for (const section of sections || []) {
    for (const item of section.items || []) {
      const hasChildren = item.children && item.children.length > 0;
      if (!hasChildren) continue;

      if (isItemOrChildActive(item, currentPath)) {
        const groupId =
          item.id ?? `${section.id || section.label || "section"}-${item.label}`;
        return groupId;
      }
    }
  }
  return null;
}
