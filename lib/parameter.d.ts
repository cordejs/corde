interface TestSend {
    say: string;
}
export interface Response extends TestSend {
    wait: string | number | boolean;
}
export {};
