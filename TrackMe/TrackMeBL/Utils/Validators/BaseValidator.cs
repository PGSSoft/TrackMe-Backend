using System.Collections.Generic;
using static System.String;

namespace TrackMeBL.Utils.Validators
{
    internal abstract class BaseValidator
    {
        public abstract bool Validate();

        public bool IsError { get; protected set; }

        public List<string> Errors { get; } = new List<string>();

        public override string ToString()
        {
            if (!IsError)
            {
                return Empty;
            }
            return Join(" ", Errors);
        }
    }
}
