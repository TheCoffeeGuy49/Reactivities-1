using AutoMapper;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Domain.Activity Activity { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Activity).SetValidator(new ActivityValidator());
            }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(new object[] { request.Activity.Id }, cancellationToken: cancellationToken);

                _mapper.Map(request.Activity, activity);

                await _context.SaveChangesAsync(cancellationToken);
            }
            

            /*
            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.Activity.Id);

                activity.Title = request.Activity.Title ?? activity.Title;

                await _context.SaveChangesAsync();
            }
            */
        }
    }
}