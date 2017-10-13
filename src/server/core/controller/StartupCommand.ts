import * as puremvc from 'puremvc';
import ModelPrepCommand from './ModelPrepCommand';
import ViewPrepCommand from './ViewPrepCommand';

export default class StartupCommand extends puremvc.MacroCommand implements puremvc.ICommand {

    public constructor () {
        super();
    }

    public initializeMacroCommand () {
        // add subSubCommand
        this.addSubCommand( ModelPrepCommand );
        this.addSubCommand( ViewPrepCommand );
    }
}
