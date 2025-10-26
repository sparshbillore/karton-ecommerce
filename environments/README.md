# Environment Configuration

This folder contains environment-specific configuration files for the Karton e-commerce application.

## Files

- `dev.env` - Development environment variables
- `prod.env` - Production environment variables

## Usage

### Loading Environment Variables

To load environment variables into your current shell session:

```bash
# For development
source environments/dev.env

# For production
source environments/prod.env
```

### Making Environment Variables Persistent

To automatically load environment variables when you start a new shell session, add the source command to your shell profile:

```bash
# Add to ~/.zshrc (for zsh users)
echo "source /Users/sparshbillore/karton-ecommerce/environments/dev.env" >> ~/.zshrc

# Or add to ~/.bashrc (for bash users)
echo "source /Users/sparshbillore/karton-ecommerce/environments/dev.env" >> ~/.bashrc
```

### Running Django with Environment Variables

You can also run Django commands with the environment loaded:

```bash
# Load dev environment and run Django
source environments/dev.env && python manage.py runserver

# Load prod environment and run Django
source environments/prod.env && python manage.py runserver
```

## Important Notes

1. **Never commit sensitive data**: Make sure to add these files to `.gitignore` if they contain sensitive information
2. **Update values**: Replace placeholder values with your actual configuration
3. **Security**: Use strong, unique passwords and API keys for production
4. **Environment separation**: Keep development and production configurations completely separate

## Environment Variables Included

- Django settings (DEBUG, SECRET_KEY, etc.)
- Database configuration
- AWS S3 and CloudFront settings
- Email configuration
- Redis/Cache settings
- API keys (Stripe, etc.)
- Security settings (for production)
