using System;
using Ninject;

namespace TrackMeBL.Providers
{
    public static class KernelProvider
    {
        public static IKernel Kernel { get; private set; }

        public static void Initialize()
        {
            if (Kernel!=null)
            {
                throw new InvalidOperationException("Provider has already been initialized");
            }
            Kernel = new StandardKernel();
        }
    }
}