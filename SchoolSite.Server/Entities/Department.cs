using System.ComponentModel;

namespace SchoolSite.Server.Entities
{
    public enum Department
    {
        None,

        [Description("Management")]
        Management,

        [Description("Personal auxiliar și nedidactic")]
        Nedidactic,

        [Description("Învățământ preșcolar")]
        Prescolar,

        [Description("Învățământ primar")]
        Primar,

        [Description("Învățământ gimnazial")]
        Gimnazial
    }
}
