import * as puremvc from 'puremvc';
import ModelPrepCommand from './ModelPrepCommand';

export default class StartupCommand extends puremvc.MacroCommand {

    public constructor () {
        super();
    }

    public initializeMacroCommand () {
        // add subSubCommand
        this.addSubCommand( ModelPrepCommand );
    }
}
