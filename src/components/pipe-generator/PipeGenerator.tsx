import {IPipeProps} from '../pipe/Pipe';

export default class PipeGenerator {

    public generatePipes(pipeOffsetX: number): IPipeProps[]  {
        
        const pipes: IPipeProps[] = [];
        
        pipes.push({x: pipeOffsetX, y: 0.5});

        // i starts at 2 because the pipe above is already defined
        for (let i = 2; i < 1000; i++) {


            // millum 30- 70 %
            const randomY = ( Math.floor(Math.random() * Math.floor(7)) + 1) /10;
            pipes.push({x: ((pipeOffsetX + 120) * i), y: randomY});
        }

        return pipes;
    }

}