from django.core.management.base import BaseCommand
from django.conf import settings
from base.models import Product
import os
from django.core.files import File
from django.core.files.storage import default_storage


class Command(BaseCommand):
    help = 'Migrate existing images from local storage to S3'

    def add_arguments(self, parser):
        parser.add_argument(
            '--dry-run',
            action='store_true',
            help='Show what would be migrated without actually doing it',
        )

    def handle(self, *args, **options):
        if not settings.USE_S3:
            self.stdout.write(
                self.style.ERROR('S3 is not enabled. Set USE_S3=True in your .env file.')
            )
            return

        dry_run = options['dry_run']
        
        # Get all products with images
        products = Product.objects.exclude(image__isnull=True).exclude(image='')
        
        if not products.exists():
            self.stdout.write(self.style.WARNING('No products with images found.'))
            return

        self.stdout.write(f'Found {products.count()} products with images.')
        
        if dry_run:
            self.stdout.write(self.style.WARNING('DRY RUN MODE - No files will be uploaded'))
        
        migrated_count = 0
        failed_count = 0

        for product in products:
            try:
                # Get the current image path
                current_image_path = product.image.path
                
                if not os.path.exists(current_image_path):
                    self.stdout.write(
                        self.style.WARNING(f'Image file not found: {current_image_path}')
                    )
                    failed_count += 1
                    continue

                if dry_run:
                    self.stdout.write(f'Would migrate: {product.name} -> {current_image_path}')
                    migrated_count += 1
                    continue

                # Read the file
                with open(current_image_path, 'rb') as f:
                    django_file = File(f)
                    
                    # Generate the new filename (preserve original name)
                    filename = os.path.basename(current_image_path)
                    
                    # Upload to S3
                    new_path = default_storage.save(f'media/{filename}', django_file)
                    
                    # Update the product's image field
                    product.image = new_path
                    product.save()
                    
                    self.stdout.write(
                        self.style.SUCCESS(f'Migrated: {product.name} -> {new_path}')
                    )
                    migrated_count += 1

            except Exception as e:
                self.stdout.write(
                    self.style.ERROR(f'Failed to migrate {product.name}: {str(e)}')
                )
                failed_count += 1

        self.stdout.write(
            self.style.SUCCESS(
                f'\nMigration complete!\n'
                f'Successfully migrated: {migrated_count}\n'
                f'Failed: {failed_count}'
            )
        )
