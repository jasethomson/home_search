import { writeFileSync } from 'fs';

export const writeToHtml = (htmlString: string): undefined => {
    writeFileSync('index.html', htmlString);
    return;
}