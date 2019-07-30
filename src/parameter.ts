interface TestSend {
  say: string;
}
/**
 * Basic type of response
 */
export interface Response extends TestSend {
  /**
   * It will expect that bot response be exacly what is defined to this variable
   */
  wait: string | number | boolean;
}
