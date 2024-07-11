import { useEffect } from "react";

/**
 * Use Async Effect
 * 
 * @param effect 
 * @param dependency 
 */
export default function useAsyncEffect(effect: () => Promise<void>, dependency: any[] = []) {
  useEffect(() => {
    (async () => await effect())();
  }, dependency);
}